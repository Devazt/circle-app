import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hook/useRegister";

export default function Register() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleRegister, handleChange } = useRegister();
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/auth/login");
  }

  return (
    <Box m={0} p={0}>
      <Card variant={"outline"} p={4} boxShadow={"lg"} rounded={"lg"}>
        <Flex justifyContent={"space-between"}>
          <Heading size={"2xl"} color={"green.400"} p={4}>
            Circle
          </Heading>
          <Button
            onClick={toggleColorMode}
            bg={"transparent"}
            p={2}
            rounded={"full"}
          >
            <Icon as={colorMode === "dark" ? BiMoon : BiSun} />
          </Button>
        </Flex>
        <CardHeader textAlign={"center"}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Register your account
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            Enter your details below
          </Text>
        </CardHeader>
        <CardBody>
          <FormControl isRequired>
            <Input
            placeholder="Fullname*"
            name="fullname"
            id="fullname"
            onChange={handleChange}
            mb={2}
            />
            <Input
            placeholder="Username*"
            name="username"
            id="username"
            onChange={handleChange}
            mb={2}
            />
            <Input
            placeholder="Email*"
            name="email"
            id="email"
            onChange={handleChange}
            mb={2}
            />
            <Input
            placeholder="Password*"
            name="password"
            id="password"
            onChange={handleChange}
            type={"password"} 
            />
          <Button
          w={"full"} 
          mt={4} 
          colorScheme={"green"}
          onClick={handleRegister}
          >
            Register
          </Button>
          </FormControl>
        </CardBody>
      </Card>
      <Text
        _hover={{ cursor: "pointer", textDecoration: "underline" }}
        mt={2}
        onClick={handleNavigate}
        fontSize={"sm"}
        color={"gray.500"}
        textAlign={"end"}
      >
        Already have an account? Login
      </Text>
    </Box>
  );
}
