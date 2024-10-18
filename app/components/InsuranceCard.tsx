import { Box, Image, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import InsuranceModal from './InsuranceModal';

interface InsuranceCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ imageUrl, title, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        as={motion.div}
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        borderColor={'blue.300'}
        height={'fit-content'}
        whileHover={{ scale: 1.02 }}
        onClick={onOpen}
        cursor="pointer"
      >
        <Image src={imageUrl} alt={title} />

        <VStack p="6" spacing="3" align="start">
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text>{description}</Text>
        </VStack>
      </Box>

      <InsuranceModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        description={description}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default InsuranceCard;
