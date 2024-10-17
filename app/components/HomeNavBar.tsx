'use client'

import React from "react"
import Image from "next/image"
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons"

const Links = ["About", "Contact", "FAQ", "Insurances"]

const NavLink = ({ children }: { children: string }) => (
  <Link
    px={4}
    py={2}
    rounded="full"
    bg="white"
    _hover={{
      textDecoration: "none",
      bg: "gray.100",
      transform: "scale(1.05)",
    }}
    href={`/${children.toLowerCase()}`}
    color="blue.800"
    transition="all 0.3s"
    fontWeight="medium"
  >
    {children}
  </Link>
)

export default function HomeNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      px={4}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
      overflow="hidden"
      bg="transparent"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" position="relative">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ base: "flex", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          color="blue.800"
          bg="white"
          _hover={{ bg: "gray.100" }}
        />
        <HStack spacing={8} alignItems="center">
          <HStack>
            <Image src="/logo.png" alt="AgriShield Logo" width={80} height={80} />
            <Box color="white" fontWeight="bold" fontSize="2xl">
              AgriShield
            </Box>
          </HStack>
          <HStack
            as="nav"
            spacing={4}
            display={{ base: "none", md: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
            <w3m-button />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
