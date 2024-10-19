import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
} from '@chakra-ui/react';

const FAQPage: React.FC = () => {
  return (
    <Box bg="gray.50" minH="100vh" py={12}>
      <Container maxW="container.lg">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="2xl" textAlign="center" color="blue.500">
            AgriShield FAQ
          </Heading>
          <Text fontSize="xl" textAlign="center" color="gray.700">
            Your questions about agricultural insurance on the blockchain, answered.
          </Text>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    What is AgriShield?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                AgriShield is a blockchain-based agricultural insurance platform that allows agricultural land owners to protect their crops against various weather-related risks.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    How does AgriShield work?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text>1. Land owners select their city, insurance start date, and end date.</Text>
                <Text>2. They purchase insurance coverage for their chosen period.</Text>
                <Text>3. An NFT (Non-Fungible Token) representing their insurance policy is minted and added to their digital wallet.</Text>
                <Text>4. The NFT can be viewed on the user&rsquo;s profile page.</Text>
                <Text>5. If the conditions for a payout are met, the land owner can claim their insurance through the NFT.</Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    What types of insurance does AgriShield offer?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                AgriShield offers three types of insurance:
                <Text>1. Flood Insurance</Text>
                <Text>2. Drought Protection</Text>
                <Text>3. Snowfall Coverage</Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    How is the insurance cost calculated?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                The insurance cost is calculated based on the duration of coverage. The cost is estimated at 0.01 ETH per day of coverage.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    How can I view my insurance policies?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                You can view your active insurance policies on your profile page. Each policy is represented by an NFT, which contains details about your coverage.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    How do I claim my insurance payout?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                If the conditions for a payout are met, you can claim your insurance by:
                <Text>1. Going to your profile page</Text>
                <Text>2. Finding the relevant insurance policy NFT</Text>
                <Text>3. Clicking the &quot;Claim&quot; button associated with that NFT</Text>
                The smart contract will verify if the conditions are met before processing the claim.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    Is my insurance policy transferable?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Yes, since your insurance policy is represented as an NFT, it is transferable. However, only the current owner of the NFT can claim the insurance payout.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    What blockchain does AgriShield use?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                AgriShield is designed to work with Ethereum-compatible blockchains. The specific network (e.g., Ethereum mainnet, testnets, or other EVM-compatible chains) may vary based on the deployment configuration.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    How are weather conditions verified for claims?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                AgriShield uses oracle services to fetch and verify weather data. This ensures that payouts are based on accurate and tamper-proof weather information.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQPage;
