import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Flex,
  Box,
  Select,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import AgriShieldArtifact from '../contracts/AgriShield.json';

interface InsuranceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageUrl: string;
}

const InsuranceModal: React.FC<InsuranceModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  imageUrl,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<string>('');
  const toast = useToast();

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDifference = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const cost = (daysDifference * 0.01).toFixed(3);
      setEstimatedCost(cost);
    } else {
      setEstimatedCost('');
    }
  }, [startDate, endDate]);

  const showToast = (
    title: string,
    description: string,
    status: 'info' | 'warning' | 'success' | 'error'
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  const handleConfirm = async () => {
    if (!selectedCity || !startDate || !endDate) {
      showToast(
        'Incomplete Information',
        'Please fill in all fields before confirming.',
        'warning'
      );
      return;
    }

    setIsLoading(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined' || !window.ethereum) {
        showToast(
          'MetaMask not found',
          'Please install MetaMask to proceed with the transaction.',
          'error'
        );
        setIsLoading(false);
        return;
      }

      // Request account access
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (window.ethereum as any).request({ method: 'eth_requestAccounts' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();

      // Replace with your deployed contract address
      const AgriShieldAddress = process.env.NEXT_PUBLIC_AGRISHIELD_CONTRACT_ADDRESS || ''; // TODO: Replace with actual address

      // Initialize contract instance
      const agriShield = new ethers.Contract(
        AgriShieldAddress,
        AgriShieldArtifact.abi,
        signer
      );

      // Convert dates to UNIX timestamps
      const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

      // Map selected city to a numerical value corresponding to InsuranceType enum
      let insuranceType: number;
      switch (title) {
        case 'Flood Insurance':
          insuranceType = 3; // Ensure these values match your InsuranceType enum
          break;
        case 'Drought Protection':
          insuranceType = 2;
          break;
        case 'Snowfall Coverage':
          insuranceType = 1;
          break;
        default:
          insuranceType = 0; // Default or handle as needed
      }

      // Calculate the number of days between start and end date
      const daysDifference = Math.ceil((endTimestamp - startTimestamp) / (24 * 60 * 60));
      
      // Calculate the value to send with the transaction (0.01 ETH per day)
      const value = ethers.parseEther((daysDifference * 0.01).toString());

      // Call the mint function
      const tx = await agriShield.mint(
        startTimestamp,
        endTimestamp,
        insuranceType,
        { value }
      );

      showToast(
        'Transaction Sent',
        `Transaction Hash: ${tx.hash}`,
        'success'
      );

      // Wait for transaction confirmation
      await tx.wait();

      showToast(
        'NFT Minted',
        'Your NFT has been successfully minted!',
        'success'
      );

      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error:', error);
      showToast(
        'Transaction Failed',
        error?.message || 'An error occurred while processing the transaction.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Image src={imageUrl} alt={title} mr={4} maxW="50%" />
            <Box>                            
              <Text mb={4}>{description}</Text>
              <Select
                placeholder="Select city"
                mb={4}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="Sofia">Sofia</option>
                <option value="Plovdiv">Plovdiv</option>
                <option value="Varna">Varna</option>
              </Select>
              <Input
                type="date"
                placeholder="Start Date"
                mb={2}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                placeholder="End Date"
                mb={4}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {estimatedCost && (
                <Text fontWeight="bold" mb={4}>
                  Estimated Cost: {estimatedCost} ETH
                </Text>
              )}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleConfirm}
            isLoading={isLoading}
            loadingText="Processing"
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InsuranceModal;
