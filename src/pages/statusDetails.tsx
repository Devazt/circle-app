import ThreadDetails from "@/feature/thread/component/Status";
import { Avatar, Box, Button, Flex, FormControl, Icon, Input } from "@chakra-ui/react";
import { API } from "@/lib/api";
import { IFeed } from "@/types/thread";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReplyList from "@/feature/reply/component/replyList";
import { useReply } from "@/feature/reply/hook/useReply";
import { BiImageAdd } from "react-icons/bi";
import IReply from "@/types/reply";

export default function Details() {
  const param = useParams()
  const [detail, setDetail] = useState<IFeed>();

  useEffect (() => {
    const getDetail = async () => {
      const res = await API.get(`/thread/` + param.id);
      const json = await res.data;
      setDetail(json.data)
    };
    getDetail();
  }, []);

  const [reply, setReply] = useState<IReply[]>([]);

  useEffect (() => {
    const getReply = async () => {
      const res = await API.get(`/reply/` + param.id);
      const json = await res.data;
      setReply(json.data)
    };
    getReply();
  }, []);

  const { handleChange, handleClickButton, handleSubmit, fileInputRef } =
    useReply();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleImagePreview(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
    } else {
      setImagePreview(null);
    }
  }

  
  return (
    <>
      <Box>
        {detail != undefined &&
        <ThreadDetails {...detail} />}
      </Box>
      <Box borderBottom={"1px"} borderX={"1px"} borderColor={"gray.500"} p={4}>
      <Box>
        <FormControl>
          <form onSubmit={handleSubmit}>
            <Flex alignItems={"center"} gap={2}>
              <Avatar name="Dan Abramov" src="https://bit.ly/dan-abramov" />
              <Input
                ml={2}
                placeholder="Write a public reply"
                variant="flushed"
                name="content"
                onChange={handleChange}
              />
              <Input
              display={"none"}
              type="hidden"
              name="thread"
              value={Number(param.id)}
              />
              <Input
                display={"none"}
                type="file"
                name="image"
                ref={fileInputRef}
                onChange={(e) => {
                  handleChange(e);
                  handleImagePreview(e);
                }}
              />
              <Button
                type="button"
                bg={"transparent"}
                w={"80px"}
                rounded={"full"}
                onClick={handleClickButton}
              >
                <Icon
                  color={"green.500"}
                  fontSize={"4xl"}
                  as={BiImageAdd}
                  ml={2}
                />
              </Button>
              <Button
                type="submit"
                rounded="full"
                colorScheme="green"
                w={"80px"}
              >
                Post
              </Button>
            </Flex>
          </form>
        </FormControl>
        {imagePreview && (
          <Box
            w={"full"}
            h={"300px"}
            bgImage={imagePreview}
            bgPosition={"center"}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
            mt={4}
            borderRadius={"10"}
            border={"1px"}
            borderColor={"gray.500"}
          />
        )}
      </Box>
      </Box>
      <Box>
        {reply && reply.map((data: any) => (
          <ReplyList
            key={data.id}
            id={data.id}
            content={data.content}
            image={data.image}
            created_at={data.created_at}
            updated_at={data.updated_at}
            user={data.user}
            thread={data.thread}
          />
        ))}
      </Box>
    </>
  );
}
