import React from 'react';
import { Box, Text, VStack, Button, useDisclosure } from '@chakra-ui/react';
import InsuranceModal from './InsuranceModal';

interface MyInsuranceCardProps {
  insuranceType: string;
  startDate: string;
  endDate: string;
  paidAmount: string;
  tokenId: number;
}

const MyInsuranceCard: React.FC<MyInsuranceCardProps> = ({
  insuranceType,
  startDate,
  endDate,
  paidAmount,
  tokenId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderColor="blue.300"
        p={4}
        shadow="md"
        _hover={{ transform: 'scale(1.01)', transition: 'transform 0.2s' }}
        cursor="pointer"
        onClick={onOpen}
      >
        <VStack spacing={3} align="start">
          <Text fontSize="xl" fontWeight="bold">
            Insurance Policy #{tokenId}
          </Text>
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
          <Button
            mt={4}
            colorScheme="blue"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
          >
            View Details
          </Button>
        </VStack>
      </Box>

      <InsuranceModal
        isOpen={isOpen}
        onClose={onClose}
        title={`Insurance Policy #${tokenId}`}
        description={`This is a ${insuranceType} covering from ${startDate} to ${endDate}.`}
        imageUrl="/path-to-your-image.png" // Replace with actual image path if available
      />
    </>
  );
};

export default MyInsuranceCard;
