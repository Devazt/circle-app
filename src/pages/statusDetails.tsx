import Reply from "@/components/postReply";
import ThreadDetails from "@/feature/thread/component/Status";
import { Box } from "@chakra-ui/react";
import { API } from "@/lib/api";
import { IFeed } from "@/types/thread";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReplyList from "@/components/replyList";
import IReply from "@/types/reply";

export default function Details() {
  const param = useParams()
  const [detail, setDetail] = useState<IFeed>();
  const [replies, setReplies] = useState<IReply[]>([]);

  useEffect (() => {
    const getDetail = async () => {
      const res = await API.get(`/thread/` + param.id);
      const json = await res.data;
      setDetail(json.data)
    };
    getDetail();
  }, []);

  useEffect (() => {
    const getReplies = async () => {
      const res = await API.get(`/reply/` + param.id);
      const json = await res.data;
      setReplies(json.data)
    };
    getReplies();
  }, []);
  return (
    <>
      <Box>
        {detail != undefined &&
        <ThreadDetails {...detail} />}
      </Box>
      <Box>
        <Reply />
      </Box>
      <Box>
        {replies.map((reply: IReply) => {
          return (
            <ReplyList {...reply} />
          );
        })}
      </Box>
    </>
  );
}
