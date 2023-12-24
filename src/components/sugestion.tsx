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
import IUser from "@/types/user";

export default function Sugestion(props: IUser) {
  const [follow, setFollow] = useState(false);

  function handleFollow() {
    setFollow(!follow);
  }

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
              <Flex gap={2} w={"full"} my={"3"}>
                <Box>
                  <Avatar name={props.fullname} src={props.photo_profile} />
                </Box>
                <Box>
                  <Text fontWeight={"bold"}>{props.fullname}</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    @{props.username}
                  </Text>
                </Box>
                <Button ml={"auto"} onClick={handleFollow}>
                  {follow ? "Following" : "Follow"}
                </Button>
              </Flex>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
