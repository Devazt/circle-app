import IFeed from "@/types/feed";

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

import {
  BiSolidLike,
  BiLike,
  BiChat,
  BiRadioCircleMarked,
} from "react-icons/bi";

export default function Feed({
  avatar,
  fullname,
  username,
  posted_at,
  content,
  isPicture,
  picture,
  like_count,
  comment_count,
  isLiked,
}: IFeed) {
  return (
    <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"}>
      <Flex p={4}>
        <Avatar name={fullname} size="md" src={avatar} />
        <Card w={"full"} variant={"unstyled"} pl={4}>
          <CardHeader>
            <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{fullname}</Heading>
              </Box>
              <Box>
                <Text color={"gray.500"}>{username}</Text>
              </Box>
              <Box>
                <Flex align={"center"}>
                  <Icon as={BiRadioCircleMarked} color={"gray.500"} />
                  <Text color={"gray.500"}>{posted_at}</Text>
                </Flex>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody py={4}>
            <Text>{content}</Text>
          </CardBody>
          {isPicture ? (
            <Image
              borderRadius={20}
              objectFit="cover"
              src={picture}
              width={"full"}
              height={"300px"}
              alt="Chakra UI"
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
              borderRadius={20}
              w={"50px"}
              variant="ghost"
              leftIcon={<Icon as={isLiked ? BiSolidLike : BiLike} />}
            >
              {like_count}
            </Button>
            <Button
              borderRadius={20}
              w={"50px"}
              variant="ghost"
              leftIcon={<BiChat />}
            >
              {comment_count} Replies
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </Box>
  );
}
