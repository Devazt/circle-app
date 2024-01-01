import {
  Box, Spinner,
} from "@chakra-ui/react";
import StatusReply from "@/feature/thread/component/StatusReply";
import ReplyForm from "@/feature/thread/component/ReplyForm";
import { useStatusReply } from "@/feature/thread/hook/useStatusReply";

export default function Details() {
  const { reply, isLoading } = useStatusReply()

  if (isLoading) return <Spinner />

  return (
    <Box>
      <Box>
        <StatusReply />
        </Box>
      <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"} p={4}>
        <ReplyForm threadReply={reply} />
        </Box>
    </Box>
  );
}
