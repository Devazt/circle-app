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
import { useState, useEffect } from "react";
import IUser from "@/types/user";
import API from "@/lib/axios";

export default function Sugestion() {
  const [follow, setFollow] = useState(false);

  function handleFollow() {
    setFollow(!follow);
  }

  // connect user to suggestion
  const [suggest, setSuggest] = useState([]);
  const getSuggest = async () => {
    const res = await API.get(`/user`);
    const json = await res.data;
    setSuggest(json.data);
  };
  useEffect(() => {
    getSuggest();
  }, []);
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
            {suggest.map((e: IUser) => (
              <Flex gap={2} w={"full"} my={"3"} key={e.id}>
                <Box>
                  <Avatar name={e.fullname} src={e.profile_picture} />
                </Box>
                <Box>
                  <Text fontWeight={"bold"}>{e.fullname}</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    @{e.username}
                  </Text>
                </Box>
                <Button ml={"auto"} onClick={handleFollow}>
                  {follow ? "Following" : "Follow"}
                </Button>
              </Flex>
            ))}
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
