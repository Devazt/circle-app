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

export default function Following() {
  const { userFollow, isLoading } = useFollowing();

  if (isLoading) return <Spinner />;

  const { following } = userFollow;

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading size={"md"}>
            Users that you follow: {following.length}
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing={4}>
            {following.map((follower: any) => (
              <Box key={follower.id}>
                <Flex gap={4}>
                  <Flex
                    flex={1}
                    gap={4}
                    alignItems={"Center"}
                    flexWrap={"wrap"}
                  >
                    <Avatar
                      name={follower.fullname}
                      src={follower.photo_profile}
                      size={"sm"}
                    />
                    <Box>
                      <Heading size={"sm"}>{follower.fullname}</Heading>
                    </Box>
                  </Flex>
                </Flex>
                <Text pt={2} fontSize={"sm"}>
                  {follower.bio}
                </Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
