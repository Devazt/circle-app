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

import { IThreadItems } from "@/types/ThreadProps";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/api";
import useToast from "../../../hooks/useToast";
import { useSelector } from "react-redux";
import { RootState } from "@/store/types/rootState";

export default function Feed({
  id,
  username,
  fullname,
  photo_profile,
  content,
  image,
  created_at,
  likes,
  likeCount,
  replies,
}: IThreadItems) {
  const [like, setLike] = useState({ thread: id });
  const user = useSelector((state: RootState) => state?.auth);
  
  const navigate = useNavigate();

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: handleLike } = useMutation({
    mutationFn: () => {
      return API.post("/likes", like);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (err) => {
      console.error(err);
      toast("Error", err.message, "error");
    },
  });

  function handleClick() {
    setLike({ thread: id });
    handleLike();
  }

  let created = new Date(created_at);
  let formatDate = created.toLocaleString("id-ID", {
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
      <Flex p={4}>
        <Avatar name={fullname} size="md" src={photo_profile} />
        <Card w={"full"} variant={"unstyled"} pl={4}>
          <CardHeader>
            <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{fullname}</Heading>
              </Box>
              <Box>
                <Text color={"gray.500"}>@{username}</Text>
              </Box>
              <Box>
                <Flex align={"center"}>
                  <Icon as={BiRadioCircleMarked} color={"gray.500"} />
                  <Text color={"gray.500"}>{formatDate}</Text>
                </Flex>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody py={4} onClick={() => navigate(`/thread/${id}`)}>
            <Text>{content}</Text>
          </CardBody>
          {image && (
            <Image
              borderRadius={20}
              objectFit="cover"
              src={image}
              width={"full"}
              height={"400px"}
              alt="Chakra UI"
              border={"1px"}
              onClick={() => navigate(`/thread/${id}`)}
              bg={"gray.200"}
            />
          )}

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
              onClick={handleClick}
              borderRadius={20}
              w={"50px"}
              variant="ghost"
            >
              {likes?.map((likes) => likes.user.id).includes(user.id) ? (
                <BiSolidLike />
              ) : (
                <BiLike />
              )}
              <Text>
                &nbsp;
                &nbsp;
                {likeCount}
                &nbsp;
                Likes
              </Text>
            </Button>
            <Button
              borderRadius={20}
              w={"50px"}
              variant="ghost"
              leftIcon={<BiChat />}
              onClick={() => navigate(`/thread/${id}`)}
            >
              {replies}
              &nbsp;
              Replies
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Box>
  );
}
