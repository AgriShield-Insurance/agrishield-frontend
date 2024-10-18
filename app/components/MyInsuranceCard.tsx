import React from 'react';
import { Box, Text, VStack, Button, Image, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';
import AgriShieldABI from '../contracts/AgriShield.json';

interface MyInsuranceCardProps {
  insuranceType: string;
  startDate: string;
  endDate: string;
  paidAmount: string;
  tokenId: number;
}
function getImageUrl(type: string) {
    switch (type) {
        case 'Snowfall Coverage':
            return 'hail.png';
        case 'Drought Protection':
            return 'heat.png';
        case 'Flood Insurance':
            return 'rain.png';
        default:
            return 'rain.png';
    }
}

const MyInsuranceCard: React.FC<MyInsuranceCardProps> = ({
  insuranceType,
  startDate,
  endDate,
  paidAmount,
  tokenId,
}) => {
  const toast = useToast();

  const handleClaim = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (window.ethereum as any).request({ method: 'eth_requestAccounts' });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = new ethers.BrowserProvider(window.ethereum as any);
        const signer = await provider.getSigner();

        // Replace with your deployed AgriShield contract address
        const contractAddress = process.env.NEXT_PUBLIC_AGRI_SHIELD_CONTRACT_ADDRESS || '';
        const contract = new ethers.Contract(contractAddress, AgriShieldABI.abi, signer);

        // Call the claim function
        const tx = await contract.claim(tokenId);
        await tx.wait();

        toast({
          title: 'Claim successful',
          description: 'Your insurance claim has been processed.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'MetaMask not detected',
          description: 'Please install MetaMask to use this feature.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error claiming insurance:', error);
      toast({
        title: 'Claim failed',
        description: 'There was an error processing your claim. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor="blue.300"
      height="fit-content"
      cursor="pointer"
      p={4}
    >
      <VStack spacing={4} align="stretch">
        <Image
          src={getImageUrl(insuranceType)}
          alt={insuranceType}
          objectFit="cover"
          alignSelf="center"
        />
        <Text fontSize="xl" fontWeight="bold">
          Insurance Policy #{tokenId}
        </Text>
        <VStack spacing={2} align="stretch">
          <Text>
            <strong>Type:</strong> {insuranceType}
          </Text>
          <Text>
            <strong>Start Date:</strong> {startDate}
          </Text>
          <Text>
            <strong>End Date:</strong> {endDate}
          </Text>
          <Text>
            <strong>Paid Amount:</strong> {paidAmount} ETH
          </Text>
        </VStack>
        <Button
          mt={2}
          colorScheme="green"
          size="sm"
          onClick={handleClaim}
          width="full"
        >
          Claim
        </Button>
      </VStack>
    </Box>
  );
};

export default MyInsuranceCard;
