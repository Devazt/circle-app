import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
  Icon,
  Flex,
  CardFooter,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";

export default function Profile() {
  return (
    <Box>
      <Card variant={"filled"} m={4}>
        <CardHeader pb={0}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            My Profile
          </Text>
        </CardHeader>
        <CardBody>
          <Box
            w={"full"}
            h={"80px"}
            bgGradient={"linear(to-r, green.400, green.600)"}
            borderRadius={"10"}
            position={"relative"}
          >
            <Image
              src="https://bit.ly/dan-abramov"
              boxSize={"70px"}
              rounded={"full"}
              borderWidth={4}
              borderColor={"gray.200"}
              borderStyle={"solid"}
              position={"absolute"}
              bottom={"-40px"}
              left={"30px"}
            />
          </Box>
          <Button
            display={"block"}
            ml={"auto"}
            borderRadius={"20"}
            size={"sm"}
            mt={2}
            border={"1px"}
            borderColor={"gray.500"}
          >
            <Flex alignItems={"center"} gap={2}>
              <Icon as={BiEdit} /> Edit Profile
            </Flex>
          </Button>
          <Text fontWeight={"bold"} fontSize={"2xl"} mt={4}>
            ✨Stella Audhina✨
          </Text>
          <Text fontSize={"sm"} color={"gray.500"}>
            @audhinafh
          </Text>
          <Text>picked over by the worms, and weird fishes</Text>
        </CardBody>
        <CardFooter justifyContent={"start"} gap={4} pt={0}>
          <Flex gap={2}>
            <Text fontWeight={"bold"}>291</Text>
            <Text color={"gray.500"}>Following</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"}>23</Text>
            <Text color={"gray.500"}>Followers</Text>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
}
