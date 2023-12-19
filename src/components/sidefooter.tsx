import logo from "@/assets/logo.png";
import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import {
  BiLogoFacebookCircle,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
} from "react-icons/bi";

export default function Sidefooter() {
  return (
    <Box>
      <Card m={4} p={2}>
        <Flex gap={1} fontSize={"xs"} alignItems={"center"} mb={2}>
          <Text>Developed by</Text>
          <Text fontWeight={"bold"}>Nandy Septiana</Text>
          <Text>•</Text>
          <BiLogoGithub />
          <BiLogoLinkedinSquare />
          <BiLogoFacebookCircle />
          <BiLogoInstagram />
        </Flex>
        <Flex gap={1} fontSize={"xs"} alignItems={"center"}>
          <Text color={"gray.500"}>Powered by</Text>
          <Image src={logo} w={"20px"} objectFit={"contain"} />
          <Text color={"gray.500"}>
            Dumbways Indonesia • #1 Coding Bootcamp
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
