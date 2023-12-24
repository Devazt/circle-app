import { IFeed } from "@/types/thread";
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
} from "@chakra-ui/react";
import { BiArrowBack, BiRadioCircleMarked } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function ThreadDetails(props: IFeed) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/`);
  }

  return (
    <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"}>
      <Button
        onClick={handleNavigate}
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
          name={props.user.fullname}
          size="md"
          src={props.user.photo_profile}
        />
        <Card w={"full"} variant={"unstyled"} pl={4}>
          <CardHeader>
            <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{props.user.fullname}</Heading>
              </Box>
              <Box>
                <Text color={"gray.500"}>@{props.user.username}</Text>
              </Box>
              <Box>
                <Flex align={"center"}>
                  <Icon as={BiRadioCircleMarked} color={"gray.500"} />
                  <Text color={"gray.500"}>{props.created_at}</Text>
                </Flex>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody py={4}>
            <Text>{props.content}</Text>
          </CardBody>
          {props.image ?
          <Image
            borderRadius={20}
            objectFit="cover"
            src={props.image}
            width={"full"}
            height={"300px"}
            alt="Chakra UI"
            border={"1px"}
            bg={"gray.200"}
          /> : null}
        </Card>
      </Flex>
    </Box>
  );
}
