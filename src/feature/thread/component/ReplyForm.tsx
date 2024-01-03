import { IReply } from "@/types/RepliesProps";
import { useFormReply } from "../hook/useFormReply";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";

interface RepliesForm {
  threadReply: {
    replies: IReply[];
  };
}

export default function ReplyForm({ threadReply }: RepliesForm) {
  const {
    handleChange,
    form,
    mutate,
    isPending,
    handleClickButton,
    fileInputRef,
    file,
    setFile,
  } = useFormReply();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {threadReply.replies.map((reply: IReply) => (
        <Box
          key={reply.id}
          borderBottom={"dotted"}
          borderColor={"gray.500"}
          minH={"50px"}
        >
          <Flex gap={4} py={2}>
            <Box>
              <Avatar
                name={reply.user.fullname}
                size="md"
                src={reply.user.photo_profile}
              />
            </Box>
            <Box w={"full"}>
              <Flex
                gap={2}
                alignItems={"center"}
                borderBottom={"1px"}
                borderColor={"gray.500"}
              >
                <Box>
                  <Heading size="sm">{reply.user.fullname}</Heading>
                </Box>
                <Box>
                  <Text color={"gray.500"}>@{reply.user.username}</Text>
                </Box>
              </Flex>
              <Text minH={"30px"}>{reply.content}</Text>
              {reply.image ? (
                  <>
                  <Image src={reply.image} h={"300px"} onClick={onOpen}/>
                  <Modal isCentered isOpen={isOpen} onClose={onClose} size={"5xl"} variant={"unstyled"}>
                    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(20px)" />
                    <ModalContent>
                      <ModalBody>
                        <Image src={reply.image}/>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                  </>
              ) : null}
            </Box>
          </Flex>
        </Box>
      ))}
      <FormControl>
        <form
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <Flex alignItems={"center"} gap={2} mt={4}>
            <Input
              ml={2}
              placeholder="Comment..."
              variant="flushed"
              name="content"
              onChange={handleChange}
              value={form.content}
            />
            <Input
              display={"none"}
              type="file"
              name="image"
              id="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
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
              isLoading={isPending}
              rounded="full"
              colorScheme="green"
              w={"80px"}
              onClick={() =>
                setTimeout(() => {
                  setFile(null);
                }, 1000)
              }
            >
              Send
            </Button>
          </Flex>
        </form>
      </FormControl>
      {file && (
        <Box display="flex" justifyContent="center">
          <Image
            mt="20px"
            h="200px"
            w="auto"
            objectFit="cover"
            rounded="md"
            src={URL.createObjectURL(file)}
          />
          <Button variant="unstyled" onClick={() => setFile(null)}>
            x
          </Button>
        </Box>
      )}
    </Box>
  );
}
