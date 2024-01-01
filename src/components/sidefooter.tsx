import logo from "@/assets/logo.png";
import { Box, Card, Flex, Image, Link, Text } from "@chakra-ui/react";
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
        <Flex gap={1} fontSize={"md"} alignItems={"center"} mb={2}>
          <Text>Developed by</Text>
          <Text fontWeight={"bold"}>Nandy Septiana</Text>
          <Text>•</Text>
          <Link href="https://github.com/Devazt">
          <BiLogoGithub />
          </Link>
          <Link href="https://www.linkedin.com/in/nandy-septiana/">
          <BiLogoLinkedinSquare />
          </Link>
          <Link href="https://www.facebook.com/myths4/">
          <BiLogoFacebookCircle />
          </Link>
          <Link href="https://www.instagram.com/nandy.septiana/">
          <BiLogoInstagram />
          </Link>
        </Flex>
        <Flex gap={1} fontSize={"md"} alignItems={"center"}>
          <Text color={"gray.500"}>Powered by</Text>
          <Image src={logo} w={"20px"} objectFit={"contain"} />
          <Text color={"gray.500"}>
            <Link href="https://dumbways.id/">
            Dumbways Indonesia • #1 Coding Bootcamp
            </Link>
          </Text>
        </Flex>
      </Card>
    </Box>
  );
}
