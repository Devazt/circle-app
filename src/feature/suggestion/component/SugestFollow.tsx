import { useFollowing } from "@/feature/follow/hook/useFollowing";
import useToast from "@/hooks/useToast";
import { API } from "@/lib/api";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function SugestFollow({
  username,
  fullname,
  user,
  photo_profile,
}: any) {
  const [follow, setFollow] = useState({ following: user });
  const { userFollow, isLoading } = useFollowing();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleFollow } = useMutation({
    mutationFn: () => {
      return API.post("/follow", follow);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      toast("Success", "User Followed", "success");
    },
    onError: (err) => {
      console.error(err);
      toast("error", err.message, "error");
    },
  });

  function handleClick() {
    setFollow({ following: user });
    handleFollow();
  }

  if (isLoading) return <Spinner />;

  const { following } = userFollow;

  const isFollowing = following.some((follow: any) => follow.id === user);

  return (
    <HStack px={2} my={2} key={user}>
      <Avatar src={photo_profile} />
      <Box w={"full"}>
        <Flex flexDirection="column" justifyItems={"center"}>
          <Text fontSize="sm" fontWeight="semibold" color="white">
            {fullname}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.600">
            @{username}
          </Text>
        </Flex>
      </Box>
      <Box>
        {isFollowing ? (
          <Button
            onClick={handleClick}
            colorScheme="whiteAlpha"
            color="white"
            size="xs"
            rounded="full"
            variant="outline"
            w="fit-content"
            opacity="70%"
          >
            Following
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            colorScheme="whiteAlpha"
            color="white"
            size="xs"
            rounded="full"
            variant="outline"
            w="fit-content"
          >
            Follow
          </Button>
        )}
      </Box>
    </HStack>
  );
}
