import React, { useState } from 'react';
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
  const toast = useToast();

  const showToast = (title: string, description: string, status: "info" | "warning" | "success" | "error") => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
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
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        await window.ethereum?.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Example transaction (replace with your actual transaction details)
        const transaction = {
          to: '0x1234567890123456789012345678901234567890', // Replace with the actual recipient address
          value: ethers.parseEther('0.1'), // Replace with the actual amount
        };

        // Send the transaction
        const tx = await signer.sendTransaction(transaction);
        
        showToast(
          'Transaction Sent',
          `Transaction Hash: ${tx.hash}`,
          'success'
        );

        onClose();
      } else {
        showToast(
          'MetaMask not found',
          'Please install MetaMask to proceed with the transaction.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      showToast(
        'Transaction Failed',
        'An error occurred while processing the transaction.',
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
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
