import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface InsuranceCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ imageUrl, title, description }) => {

  return (
    <Box
      as={motion.div}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={'blue.300'}
      height={'fit-content'}
      whileHover={{ scale: 1.05 }}
    >
      <Image src={imageUrl} alt={title} />

      <VStack p="6" spacing="3" align="start">
        <Text fontWeight="bold" fontSize="xl">
          {title}
        </Text>
        <Text>{description}</Text>
      </VStack>
    </Box>
  );
};

export default InsuranceCard;
