import Feed from "@/feature/thread/component/Feeds";
import { useThreadCreate } from "@/feature/thread/hook/useThreadCreate";
import { Avatar, Box, Button, Flex, FormControl, Heading, Icon, Image, Input, Spinner,} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { useThread } from "@/feature/thread/hook/useThread";
import { useFollowing } from "@/feature/follow/hook/useFollowing";
import { IThreadPost } from "@/types/ThreadProps";

export default function Home() {
  const { feed, isLoading } = useThread();
  const { handleChange, mutate, isPending, handleClickButton, fileInputRef, form, file, setFile } =
    useThreadCreate();
  const { userFollow: userProfileData } = useFollowing();

  if ( isLoading ) return <Spinner />

  return (
    <>
      <Box
        borderBottom={"1px"}
        borderX={"1px"}
        borderColor={"gray.500"}
        p={4}
        pt={8}
      >
        <Heading fontSize={"3xl"} fontWeight={"semi-bold"}>
          Home
        </Heading>
        <FormControl>
          <form 
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            <Flex alignItems={"center"} gap={2} mt={4}>
              <Avatar name="Dan Abrahmov" src={userProfileData?.photo_profile} />
              <Input
                ml={2}
                placeholder="What's on your mind?"
                variant="flushed"
                name="content"
                onChange={handleChange}
                value={form.content}
              />
              <Input
                display={"none"}
                type="file"
                name="image"
                id="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
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
                isLoading={isPending}
                rounded="full"
                colorScheme="green"
                w={"80px"}
                onClick={() =>
                  setTimeout(() => {
                    setFile(null);
                  }, 1000)}
              >
                Post
              </Button>
            </Flex>
          </form>
        </FormControl>
        {file && (
        <Box display="flex" justifyContent="center">
          <Image
            mt="20px"
            h="200px"
            w="auto"
            objectFit="cover"
            rounded="md"
            src={URL.createObjectURL(file)}
          />
          <Button variant="unstyled" onClick={() => setFile(null)}>
            x
          </Button>
        </Box>
      )}
      </Box>
        {feed?.map((thread: IThreadPost) => thread.user ? (
          <Feed 
          key={thread.id}
          id={thread.id}
          username={thread.user.username}
          fullname={thread.user.fullname}
          photo_profile={thread.user.photo_profile}
          content={thread.content}
          image={thread.image}
          created_at={thread.created_at}
          likes={thread.likes}
          likeCount={thread.likeCount}
          replies={thread.replyCount}
          />
        ) : null
        )}
    </>
  );
}
