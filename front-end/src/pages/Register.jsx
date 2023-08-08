"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [cred, setCred] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
    // console.log(cred);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    console.log('onsubmit clicked');
    // console.log(cred);
    const url = "http://localhost:3000/api/user/createuser"
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ email: cred.email, first_name: cred.first_name, last_name:cred.last_name, password: cred.password })
      })
      // console.log(await response);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl onChange={handleOnChange} >
              <HStack>
                <Box>
                  <FormLabel>First Name</FormLabel>
                  <Input name="first_name" type="text" />
                </Box>
                <Box>
                  <FormLabel>Last Name</FormLabel>
                  <Input name="last_name" type="text" />
                </Box>
              </HStack>
              <FormLabel>Email address</FormLabel>
              <Input name="email" type="email" />
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  onClick={handleOnSubmit}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
