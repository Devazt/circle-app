import { Box, Card, CardBody, CardFooter, Flex, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import { useProfileCard } from "../hook/useProfileCard";
import ProfileThread from "./ProfileThread";

export default function ProfileUser() {
  const { profile, isLoading } = useProfileCard();

  if (isLoading) return <Spinner />;

  const { threads } = profile;

  return (
    <Box>
      <Flex direction={"column"} gap={4}>
      <Card variant={"filled"} m={4}>
        <CardBody>
          <Box
            w={"full"}
            h={"200px"}
            bgGradient={"linear(to-r, green.400, green.600)"}
            borderRadius={"10"}
            position={"relative"}
          >
            <Image
              src={profile.photo_profile}
              boxSize={"200px"}
              rounded={"full"}
              borderWidth={4}
              borderColor={"gray.200"}
              borderStyle={"solid"}
              position={"absolute"}
              bottom={"-100px"}
              left={"60%"}
            />
          </Box>
          <Text fontWeight={"bold"} fontSize={"3xl"} mt={4}>
            {profile.fullname}
          </Text>
          <Text fontSize={"lg"} color={"gray.500"}>
            @{profile.username}
          </Text>
          <Text fontSize={"lg"}>{profile.bio}</Text>
        </CardBody>
        <CardFooter justifyContent={"start"} gap={4} pt={0}>
          <Flex gap={2}>
            <Text fontWeight={"bold"}>{profile.following.length}</Text>
            <Text color={"gray.500"}>Following</Text>
          </Flex>
          <Flex gap={2}>
            <Text fontWeight={"bold"}>{profile.follower.length}</Text>
            <Text color={"gray.500"}>Followers</Text>
          </Flex>
        </CardFooter>
      </Card>
      <Box>
        <Heading fontWeight={"bold"} p={4}>
          Threads
        </Heading>
      {threads?.map((thread: any) => (
              <ProfileThread
                key={thread.id}
                id={thread.id}
                content={thread.content}
                created_at={thread.created_at}
                image={thread.image}
              />
            ))}
      </Box>
      </Flex>
    </Box>
  );
}
