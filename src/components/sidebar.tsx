import {
  Box,
  Stack,
  Heading,
  List,
  ListItem,
  Button,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import {
  BiHomeCircle,
  BiSearchAlt,
  BiHeart,
  BiUserCircle,
  BiLogOut,
  BiSun,
  BiMoon,
} from "react-icons/bi";

export default function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack h="100vh" justifyContent="space-between" p={8} position={"fixed"}>
      <Box>
        <Box>
          <Heading size={"2xl"} color={"green.400"} pb={8}>
            Circle
            <Button
              onClick={toggleColorMode}
              _hover={{ bg: "transparent" }}
              bg={"transparent"}
            >
              <Icon as={colorMode === "dark" ? BiMoon : BiSun} />
            </Button>
          </Heading>
        </Box>
        <List fontSize="1rem" spacing={4}>
          <Box display={"flex"} alignItems="center">
            <BiHomeCircle />
            <ListItem ms={3}>Home</ListItem>
          </Box>
          <Box display={"flex"} alignItems="center">
            <BiSearchAlt />
            <ListItem ms={3}>Search</ListItem>
          </Box>
          <Box display={"flex"} alignItems="center">
            <BiHeart />
            <ListItem ms={3}>Follows</ListItem>
          </Box>
          <Box display={"flex"} alignItems="center">
            <BiUserCircle />
            <ListItem ms={3}>Profile</ListItem>
          </Box>
        </List>
        <Stack pt="10">
          <Button rounded="full" colorScheme="green" w="200px">
            Create Post
          </Button>
        </Stack>
      </Box>
      <Button leftIcon={<BiLogOut />} variant="unstyled">
        Logout
      </Button>
    </Stack>
  );
}
