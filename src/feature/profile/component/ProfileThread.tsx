import { Box, HStack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ProfileThread({ id, content, image, created_at }: any) {
  let created = new Date(created_at);
  created_at = created.toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <HStack borderBottom={"dotted"} borderColor={"gray.500"} p={4} w={"full"}>
      <Box px="1rem">
        <Link to={`/thread/${id}`}>
          <Box>
            <Text fontSize="md" color="gray.400" fontWeight={"bold"} textDecoration={"underline"}>
              {created_at}
            </Text>
          </Box>
          <Box my="2">
              <Text fontSize="lg">{content}</Text>
            </Box>
          <Box ms="3rem">
            {image && (
              <Box mt="0.5rem">
                <Image
                  height="400px"
                  objectFit="cover"
                  src={image}
                  alt="Dan Abramov"
                  rounded="md"
                />
              </Box>
            )}
          </Box>
        </Link>
      </Box>
    </HStack>
  );
}
