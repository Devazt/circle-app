import Feed from "@/feature/thread/component/Feeds";
import { useState } from "react";
import { useThread } from "@/feature/thread/hook/useThread";
import { Avatar, Box, Button, Flex, FormControl, Heading, Icon, Input, Text} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";

export default function Home() {
  const { handleChange, handleClickButton, handleSubmit, fileInputRef, thread, isLoading, refetch } =
    useThread();

  const [ imagePreview, setImagePreview ] = useState<string | null>(null);

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
          <form onSubmit={handleSubmit}>
            <Flex alignItems={"center"} gap={2} mt={4}>
              <Avatar name="Dan Abramov" src="https://bit.ly/dan-abramov" />
              <Input
                ml={2}
                placeholder="What's on your mind?"
                variant="flushed"
                name="content"
                onChange={handleChange}
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
        {isLoading && 
        <>
        <Text>Loading...</Text>
        <Button onClick={() => refetch()}>Refresh</Button>
        </>
        }
        {thread && thread.map((data: any) => (
          <Feed 
          key={data.id}
          id={data.id}
          content={data.content}
          image={data.image}
          created_at={data.created_at}
          user={data.user}
          />
        ))}
    </>
  );
}
