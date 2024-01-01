import Spinner from "@/components/Spinner";
import { useFollowing } from "../hook/useFollowing";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

export default function Follower() {
  const { userFollow, isLoading } = useFollowing();

  if (isLoading) return <Spinner />;

  const { follower } = userFollow;

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading size={"md"}>
            Your followers: {follower.length}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={4}>
            {follower.map((following: any) => (
              <Box key={following.id}>
                <Flex gap={4}>
                  <Flex
                    flex={1}
                    gap={4}
                    alignItems={"Center"}
                    flexWrap={"wrap"}
                  >
                    <Avatar
                      name={following.fullname}
                      src={following.photo_profile}
                      size={"sm"}
                    />
                    <Box>
                      <Heading size={"sm"}>{following.fullname}</Heading>
                    </Box>
                  </Flex>
                </Flex>
                <Text pt={2} fontSize={"sm"}>
                  {following.bio}
                </Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
