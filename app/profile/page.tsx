'use client';

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MyInsuranceCard from '../components/MyInsuranceCard';
import AgriShieldNFT from '../contracts/AgriShieldNFT.json';
import AgriShield from '../contracts/AgriShield.json';
import { Box, Heading, Text, Grid } from '@chakra-ui/react';

interface InsurancePolicy {
  insuranceType: string;
  startDate: string;
  endDate: string;
  paidAmount: string;
  tokenId: bigint;
}

const MyProfilePage: React.FC = () => {
  const [insurancePolicies, setInsurancePolicies] = useState<InsurancePolicy[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).ethereum) {
        console.log('Ethereum object not found');
        return;
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();

        const agriShieldNFTContract = new ethers.Contract(
          'YOUR_AGRISHLIELD_NFT_CONTRACT_ADDRESS',
          AgriShieldNFT.abi,
          signer
        );

        const agriShieldContract = new ethers.Contract(
          'YOUR_AGRISHLIELD_CONTRACT_ADDRESS',
          AgriShield.abi,
          signer
        );

        const balance: bigint = await agriShieldNFTContract.balanceOf(account);
        const balanceNumber = Number(balance);

        const policies: InsurancePolicy[] = [];

        for (let i = 0; i < balanceNumber; i++) {
          const tokenId: bigint = await agriShieldNFTContract.tokenOfOwnerByIndex(account, i);

          const insurancePolicy = await agriShieldNFTContract.getInsurancePolicy(tokenId);
          const insuranceType = getInsuranceType(insurancePolicy.insuranceType);
          const startDate = new Date(Number(insurancePolicy.startDate) * 1000).toLocaleDateString();
          const endDate = new Date(Number(insurancePolicy.endDate) * 1000).toLocaleDateString();

          const paidAmount: bigint = await agriShieldContract.getRequiredPayment(
            insurancePolicy.startDate,
            insurancePolicy.endDate
          );
          const paidAmountInEth = ethers.formatEther(paidAmount);

          policies.push({
            insuranceType,
            startDate,
            endDate,
            paidAmount: paidAmountInEth,
            tokenId,
          });
        }

        setInsurancePolicies(policies);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchNFTs();
  }, []);

  const getInsuranceType = (typeId: number): string => {
    const types = ['Crop Insurance', 'Livestock Insurance', 'Equipment Insurance'];
    return types[typeId] || 'Unknown';
  };

  return (
    <Box maxW="container.lg" mx="auto" p={4} mt="60px">
      <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
        My Insurance NFTs
      </Heading>
      {insurancePolicies.length === 0 ? (
        <Text>No insurance policies found.</Text>
      ) : (
        <Grid 
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} 
          gap={4}
        >
          {insurancePolicies.map((policy) => (
            <MyInsuranceCard
              key={policy.tokenId.toString()}
              insuranceType={policy.insuranceType}
              startDate={policy.startDate}
              endDate={policy.endDate}
              paidAmount={policy.paidAmount}
              tokenId={Number(policy.tokenId)}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyProfilePage;
