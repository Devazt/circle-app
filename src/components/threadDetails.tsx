import API from "@/lib/axios";
import IFeed from "@/types/thread";
import { Avatar, Box, Flex, Icon, Text, Card, CardHeader, CardBody, Heading, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiArrowBack, BiRadioCircleMarked } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";


export default function ThreadDetails() {
  const navigate = useNavigate()
  function handleNavigate() {
    navigate(`/`)
  }
  const { id } = useParams()
  const [detail, setDetail] = useState<IFeed>();

  useEffect (() => {
    const getDetail = async () => {
      const res = await API.get(`/thread/${id}`);
      const json = await res.data;
      setDetail(json.data);
    };
    getDetail();
  }, []);
    
  return (
    <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"}>
      <Button onClick={handleNavigate} colorScheme={"green"} rounded={"full"} p={5} m={"4"} gap={2} ><BiArrowBack size={20} /> Back</Button>
      <Flex p={4}>
        <Avatar name={detail?.user.fullname} size="md" src={detail?.user.profile_picture} />
        <Card w={"full"} variant={"unstyled"} pl={4}>
          <CardHeader>
            <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{detail?.user.fullname}</Heading>
              </Box>
              <Box>
                <Text color={"gray.500"}>@{detail?.user.username}</Text>
              </Box>
              <Box>
                <Flex align={"center"}>
                  <Icon as={BiRadioCircleMarked} color={"gray.500"} />
                  <Text color={"gray.500"}>"1h ago"</Text>
                </Flex>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody py={4}>
            <Text>Ini Konten</Text>
          </CardBody>
          {detail?.image ?
          <Image borderRadius={20} objectFit="cover" src="bit.ly/dan-abramov" width={"full"} height={"300px"} alt="Chakra UI" /> : null }
        </Card>
      </Flex>
    </Box>
  )
}
