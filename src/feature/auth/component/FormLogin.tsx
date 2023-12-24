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
import { useLogin } from "../hook/useLogin";

export default function Login() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleLogin, handleChange } = useLogin();
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/auth/register");
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
            Sign in to your account
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            Enter your details below
          </Text>
        </CardHeader>
        <CardBody>
          <FormControl isRequired>
            <Input
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleChange}
              mb={2}
              type="email"
            />
            <Input
              placeholder="Password"
              name="password"
              id="password"
              onChange={handleChange}
              mb={2}
              type="password"
            />
            <Box display="flex" justifyContent={"flex-end"}>
              <Text>Forgot password?</Text>
            </Box>
            <Button
              w={"full"}
              mt={4}
              colorScheme={"green"}
              onClick={handleLogin}
            >
              Login
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
        Don't have an account yet? Sign up
      </Text>
    </Box>
  );
}
