import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Sugestion() {
  const [follow, setFollow] = useState(false);
  const sugest = [
    {
      id: 1,
      avatar: "https://bit.ly/dan-abramov",
      fullname: "Dan Abramov",
      username: "@danabra",
      isFollowing: false,
    },
    {
      id: 2,
      avatar: "https://bit.ly/dan-abramov",
      fullname: "Dan Abramov",
      username: "@danabra",
      isFollowing: true,
    },
    {
      id: 3,
      avatar: "https://bit.ly/dan-abramov",
      fullname: "Dan Abramov",
      username: "@danabra",
      isFollowing: false,
    },
    {
      id: 4,
      avatar: "https://bit.ly/dan-abramov",
      fullname: "Dan Abramov",
      username: "@danabra",
      isFollowing: false,
    },
    {
      id: 5,
      avatar: "https://bit.ly/dan-abramov",
      fullname: "Dan Abramov",
      username: "@danabra",
      isFollowing: true,
    },
    {
      id: 6,
      avatar: "https://bit.ly/dan-abramov",
      fullname: "Dan Abramov",
      username: "@danabra",
      isFollowing: false,
    },
  ];
  return (
    <Box>
      <Card variant={"filled"} m={4}>
        <CardHeader pb={0}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Suggested for you
          </Text>
        </CardHeader>
        <CardBody pt={2} overflow={"hidden"}>
          <Box
            h={"300px"}
            overflowY={"scroll"}
            pr={2}
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {sugest.map((item) => (
              <Flex gap={2} key={item.id} w={"full"} my={"3"}>
                <Avatar name={item.fullname} src={item.avatar} />
                <Box>
                  <Text fontWeight={"bold"}>{item.fullname}</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {item.username}
                  </Text>
                </Box>
                {item.isFollowing == follow ? (
                  <Button ml={"auto"} onClick={() => setFollow(false)}>
                    Following
                  </Button>
                ) : (
                  <Button ml={"auto"} onClick={() => setFollow(true)}>
                    Follow
                  </Button>
                )}
              </Flex>
            ))}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
