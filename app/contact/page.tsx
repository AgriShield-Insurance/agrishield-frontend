import { Box, Text, Link, VStack, HStack, Button } from "@chakra-ui/react";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      bg="gray.50"
    >
      <VStack spacing={6} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.700">
          This project was made by
        </Text>
        <HStack spacing={12}>
          <VStack>
            <Text fontSize="xl" fontWeight="semibold" color="blue.600">
              Denis Ivanov
            </Text>
            <Button
              as={Link}
              href="https://www.linkedin.com/in/denisivanov26/"
              isExternal
              leftIcon={<FaLinkedin />}
              variant="outline"
              colorScheme="blue"
              size="sm"
            >
              LinkedIn
            </Button>
          </VStack>
          <VStack>
            <Text fontSize="xl" fontWeight="semibold" color="blue.600">
              Kaloyan Mitev
            </Text>
            <Button
              as={Link}
              href="https://www.linkedin.com/in/kaloyan-mitev-dev/"
              isExternal
              leftIcon={<FaLinkedin />}
              variant="outline"
              colorScheme="blue"
              size="sm"
            >
              LinkedIn
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
}
