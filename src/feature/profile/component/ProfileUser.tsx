import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useProfileCard } from "../hook/useProfileCard";
import FormProfile from "./FormProfile";
import ProfileThread from "./ProfileThread";

export default function ProfileUser() {
  const { profile, isLoading } = useProfileCard();

  if (isLoading) return <Spinner />;

  const { threads } = profile;

  return (
    <Box>
      <Flex direction={"column"} gap={4}>
      <Box p={4} borderBottom={"1px"} borderColor={"gray.500"}>
        <FormProfile
          photo_profile={profile.photo_profile}
          username={profile.username}
          fullname={profile.fullname}
          bio={profile.bio}
        />
      </Box>
      <Box>
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
