import IReply from "@/types/RepliesProps";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";

export default function ReplyList(props: IReply) {

  return (
    <Box
      borderBottom={"1px"}
      borderX={"1px"}
      borderColor={"gray.500"}
      p={4}
    >
            <Box mt={4}>
                <Flex gap={2}>
                    <Box>
                        <Avatar name={props.user.fullname} src={props.user.photo_profile} />
                    </Box>
                    <Box justifyContent={"space-between"}>
                        <Flex alignItems={"center"} gap={2}>
                            <Text fontWeight={"bold"}>{props.user.fullname}</Text>
                            <Text fontSize={"xs"} color={"gray.500"}>@{props.user.username}</Text>
                        </Flex>
                        <Box>
                            <Text fontSize={"sm"}>{props.content}</Text>
                        </Box>
                    </Box>
                </Flex>
            </Box>
    </Box>
  );
}
