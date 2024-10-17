'use client'

import { Box, Button, Image, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box
      backgroundImage="url('background.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box
        p={4}
        borderRadius={40}
        textAlign="center"
        color="white"
        height={'500px'}
        width={'500px'}
        bg='rgba(255, 255, 255, 0.9)'
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src="/logo.png" alt="Logo" maxWidth="400px" mt={-28} />
        <VStack spacing={4} flex={1} justifyContent="center">
          <Box as="h1" fontSize="6xl" fontWeight="bold" color="blue.600" mb={2} mt={-24}>
            AgriShield
          </Box>
          <Box fontSize="lg" color="gray.700" maxWidth="80%" textAlign="center">
            The first crypto-powered agricultural insurance provider, protecting your harvest with blockchain technology
          </Box>
        </VStack>
        <Button colorScheme="blue" size="lg" width={'200px'} onClick={() => window.location.href = '/insurances'}>
          Get Insurance
        </Button>
      </Box>
    </Box>
  );
}
