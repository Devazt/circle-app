import { Avatar, Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";

export default function Reply() {
  return (
    <Box
      borderBottom={"1px"}
      borderX={"1px"}
      borderColor={"gray.500"}
      p={4}
    >
      <Box>
        <Flex alignItems={"center"} gap={2}>
          <Avatar name="Dan Abramov" src="https://bit.ly/dan-abramov" />
          <Input
            ml={2}
            placeholder="Write a public reply"
            variant="flushed"
          />
          <Button bg={"transparent"} w={"80px"} rounded={"full"}>
            <Icon color={"green.500"} fontSize={"4xl"} as={BiImageAdd} ml={2} />
          </Button>
          <Button rounded="full" colorScheme="green" w={"80px"}>
            Post
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
