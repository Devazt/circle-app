import {
  Box,
  Stack,
  Heading,
  List,
  ListItem,
  Button,
  useColorMode,
  Icon,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Avatar,
  FormControl,
  Input,
} from "@chakra-ui/react";
import {
  BiHomeCircle,
  BiSearchAlt,
  BiHeart,
  BiUserCircle,
  BiLogOut,
  BiSun,
  BiMoon,
  BiImageAdd,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useThread } from "@/feature/thread/hook/useThread";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "@/store/rootReducer";

export default function Sidebar() {
  const OverlayPost = () => (
    <ModalOverlay
      bg={"blackAlpha.300"}
      backdropFilter={"blur(20px), hue-rotate(90deg)"}
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayPost />);

  const navHome = useNavigate();
  // const navSearch = useNavigate();
  // const navFollows = useNavigate();
  // const navProfile = useNavigate();
  const navLogout = useNavigate();

  function handleHome() {
    navHome("/");
  }
  // function handleSearch() {
  //   navSearch("/search");
  // }
  // // function handleFollows() {
  // //   navFollows("/follows");
  // }
  // // function handleProfile() {
  // //   navProfile("/profile");
  // }

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(AUTH_LOGOUT());
    navLogout("/auth/login");
  }

  const { colorMode, toggleColorMode } = useColorMode();

  const { handleChange, handleClickButton, handleSubmit, fileInputRef } =
    useThread();
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
    <Stack h="100vh" justifyContent="space-between" p={8} position={"fixed"}>
      <Box>
        <Box>
          <Heading size={"3xl"} color={"green.400"} pb={8}>
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
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            onClick={handleHome}
            display={"flex"}
            alignItems="center"
          >
            <BiHomeCircle />
            <ListItem ms={3}>Home</ListItem>
          </Box>
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            display={"flex"}
            alignItems="center"
          >
            <BiSearchAlt />
            <ListItem ms={3}>Search</ListItem>
          </Box>
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            display={"flex"}
            alignItems="center"
          >
            <BiHeart />
            <ListItem ms={3}>Follows</ListItem>
          </Box>
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            display={"flex"}
            alignItems="center"
          >
            <BiUserCircle />
            <ListItem ms={3}>Profile</ListItem>
          </Box>
        </List>
        <Stack pt="10">
          <Button
            rounded="full"
            colorScheme="green"
            w="200px"
            onClick={() => {
              setOverlay(<OverlayPost />);
              onOpen();
            }}
          >
            Create Post
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>
            {overlay}
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <FormControl>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <Flex mt={5}>
                      <Box>
                        <Avatar
                          name="Dan Abramov"
                          src="https://bit.ly/dan-abramov"
                        />
                      </Box>
                      <Box ml={4}>
                        <Input
                          w={"400px"}
                          placeholder="What is happening?!"
                          variant="flushed"
                          name="content"
                          minH={"50px"}
                          onChange={handleChange}
                        />
                      </Box>
                    </Flex>
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
                  </ModalBody>
                  <ModalFooter>
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
                  </ModalFooter>
                </form>
              </FormControl>
            </ModalContent>
          </Modal>
        </Stack>
      </Box>
      <Button onClick={handleLogout} leftIcon={<BiLogOut />} variant="unstyled">
        Logout
      </Button>
    </Stack>
  );
}
