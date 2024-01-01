import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { BiArrowBack, BiRadioCircleMarked } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useStatusReply } from "../hook/useStatusReply";

export default function StatusReply() {
  const navigate = useNavigate();
  const { reply, isLoading } = useStatusReply();

  if (isLoading) return <Spinner />;

 let created = new Date(reply.created_at);
  const formatdate = created.toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"}>
      <Button
        onClick={() => navigate(-1)}
        colorScheme={"green"}
        rounded={"full"}
        p={5}
        m={"4"}
        gap={2}
      >
        <BiArrowBack size={20} /> Status
      </Button>
      <Flex p={4}>
        <Avatar
          name={reply.user.fullname}
          size="md"
          src={reply.user.photo_profile}
        />
        <Card w={"full"} variant={"unstyled"} pl={4}>
          <CardHeader>
            <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{reply.user.fullname}</Heading>
              </Box>
              <Box>
                <Text color={"gray.500"}>@{reply.user.username}</Text>
              </Box>
              <Box>
                <Flex align={"center"}>
                  <Icon as={BiRadioCircleMarked} color={"gray.500"} />
                  <Text color={"gray.500"}>{formatdate}</Text>
                </Flex>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody py={4}>
            <Text>{reply.content}</Text>
          </CardBody>
          {reply.image ?
          <Image
            borderRadius={20}
            objectFit="cover"
            src={reply.image}
            height={"full"}
            alt="Chakra UI"
            border={"1px"}
            bg={"gray.200"}
          /> : null}
        </Card>
      </Flex>
    </Box>
  );
}
