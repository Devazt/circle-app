import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { useThread } from "../hook/useThread";

export default function Post() {
  const { handleChange, handleClickButton, handleSubmit, fileInputRef } =
    useThread();
  return (
    <>
      <Box
        borderBottom={"1px"}
        borderX={"1px"}
        borderColor={"gray.500"}
        p={4}
        pt={8}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Home
        </Text>
        <FormControl>
          <form onSubmit={handleSubmit}>
            <Flex alignItems={"center"} gap={2} mt={4}>
              <Avatar name="Dan Abramov" src="https://bit.ly/dan-abramov" />
              <Input
                ml={2}
                placeholder="What's on your mind?"
                variant="flushed"
                name="content"
                onChange={handleChange}
              />
              <Input
                display={"none"}
                type="file"
                name="image"
                onChange={handleChange}
                ref={fileInputRef}
              />
              <Button
                type="button"
                bg={"transparent"}
                w={"80px"}
                rounded={"full"}
                onClick={handleClickButton}
              >
                <Icon
                  color={"green.500"}
                  fontSize={"4xl"}
                  as={BiImageAdd}
                  ml={2}
                />
              </Button>
              <Button
                type="submit"
                rounded="full"
                colorScheme="green"
                w={"80px"}
              >
                Post
              </Button>
            </Flex>
          </form>
        </FormControl>
      </Box>
    </>
  );
}
