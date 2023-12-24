import { IFeed } from "@/types/thread";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Icon,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  BiSolidLike,
  BiLike,
  BiChat,
  BiRadioCircleMarked,
} from "react-icons/bi";

export default function Feed(props: IFeed) {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/thread/${props.id}`);
  }

  function handleLike() {
    setLike(!like);
  }
  return (
    <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"}>
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
                <Text color={"gray.500"}>{props.user.username}</Text>
              </Box>
              <Box>
                <Flex align={"center"}>
                  <Icon as={BiRadioCircleMarked} color={"gray.500"} />
                  <Text color={"gray.500"}>{props.created_at}</Text>
                </Flex>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody py={4} onClick={handleNavigate}>
            <Text>{props.content}</Text>
          </CardBody>
          {props.image ? (
            <Image
              borderRadius={20}
              objectFit="cover"
              src={props.image}
              width={"full"}
              height={"300px"}
              alt="Chakra UI"
              border={"1px"}
              onClick={handleNavigate}
              bg={"gray.200"}
            />
          ) : null}

          <CardFooter
            mt={2}
            justify="start"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button
              onClick={handleLike}
              borderRadius={20}
              w={"50px"}
              variant="ghost"
              leftIcon={<Icon as={like ? BiSolidLike : BiLike} />}
            >
              {/* {like_count} */}
            </Button>
            <Button
              borderRadius={20}
              w={"50px"}
              variant="ghost"
              leftIcon={<BiChat />}
              onClick={handleNavigate}
            >
              {/* {comment_count} */}
              Replies
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Box>
  );
}
