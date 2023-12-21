import { Avatar, Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";

export default function Post() {
  return (
    <Box
      borderBottom={"1px"}
      borderX={"1px"}
      borderColor={"gray.500"}
      p={4}
      pt={8}
    >
      <Box>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Home
        </Text>
        <Flex alignItems={"center"} gap={2} mt={4}>
          <Avatar name="Dan Abramov" src="https://bit.ly/dan-abramov" />
          <form>
          <Input
            ml={2}
            placeholder="What's on your mind, Stella?"
            variant="flushed"
            name="content"
          />
          <Input
          ml={2}
          placeholder="Input image here"
          variant="flushed"
          name="image"
        />
          <Button bg={"transparent"} w={"80px"} rounded={"full"}>
            <Icon color={"green.500"} fontSize={"4xl"} as={BiImageAdd} ml={2} />
          </Button>
          <Button form="post" type="submit" rounded="full" colorScheme="green" w={"80px"}>
            Post
          </Button>
          </form>
        </Flex>
      </Box>
    </Box>
  );
}
