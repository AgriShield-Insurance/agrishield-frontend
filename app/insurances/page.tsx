'use client'

import { Box, SimpleGrid } from "@chakra-ui/react";
import InsuranceCard from "../components/InsuranceCard";
import insurancesData from "./insuranceData.json";

// Add this type declaration
type Insurance = {
  imageUrl: string;
  title: string;
  description: string;
};

// Explicitly type the imported data
const typedInsurancesData: Insurance[] = insurancesData as Insurance[];

export default function InsurancesPage() {
  return (
    <Box
      backgroundColor="white"
      mt="64px"
      display="flex"
      justifyContent="center"
      minHeight="100vh"
      justifySelf="center"
      width="80%"
      p={8}
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {typedInsurancesData.map((insurance, index) => (
          <InsuranceCard
            key={index}
            imageUrl={insurance.imageUrl}
            title={insurance.title}
            description={insurance.description}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
