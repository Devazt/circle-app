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
  ModalBody,
  ModalFooter,
  Flex,
  Avatar,
  FormControl,
  Input,
  Image,
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
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "@/store/rootReducer";
import { useThreadCreate } from "@/feature/thread/hook/useThreadCreate";
import { useFollowing } from "@/feature/follow/hook/useFollowing";
import useToast from "@/hooks/useToast";

export default function Sidebar() {
  const OverlayPost = () => (
    <ModalOverlay
      bg={"blackAlpha.300"}
      backdropFilter={"blur(20px), hue-rotate(90deg)"}
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayPost />);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  function handleLogout() {
    dispatch(AUTH_LOGOUT());
    toast("Logout", "You have been logged out", "info");
  }
  

  const { colorMode, toggleColorMode } = useColorMode();

  const {
    handleChange,
    mutate,
    isPending,
    handleClickButton,
    fileInputRef,
    form,
    file,
    setFile,
  } = useThreadCreate();

  const { userFollow: userProfileData } = useFollowing();

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
            display={"flex"}
            alignItems="center"
          >
            <BiHomeCircle />
            <NavLink to="/">
            <ListItem ms={3}>Home</ListItem>
            </NavLink>
          </Box>
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            display={"flex"}
            alignItems="center"
          >
            <BiSearchAlt />
            <NavLink to="/search">
            <ListItem ms={3}>Search</ListItem>
            </NavLink>
          </Box>
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            display={"flex"}
            alignItems="center"
          >
            <BiHeart />
            <NavLink to ="/follows">
            <ListItem ms={3}>Follows</ListItem>
            </NavLink>
          </Box>
          <Box
            pl={2}
            w={"100px"}
            _hover={{ cursor: "pointer", bg: "green.600", rounded: "full" }}
            display={"flex"}
            alignItems="center"
          >
            <BiUserCircle />
            <NavLink to="/profile">
            <ListItem ms={3}>Profile</ListItem>
            </NavLink>
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
              <FormControl>
                <form
                  encType="multipart/form-data"
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutate();
                  }}
                >
                  <ModalBody>
                    <Flex mt={5}>
                      <Box>
                        <Avatar
                          name="Dan Abramov"
                          src={userProfileData?.photo_profile}
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
                          value={form.content}
                        />
                      </Box>
                    </Flex>
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
                        <Button
                          variant="unstyled"
                          onClick={() => setFile(null)}
                        >
                          x
                        </Button>
                      </Box>
                    )}
                  </ModalBody>
                  <ModalFooter>
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
                        }, 1000)
                      }
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
      <Button
        onClick={() => {
          handleLogout();
          navigate("/auth/login");
        }}
        leftIcon={<BiLogOut />}
        variant="unstyled"
      >
        Logout
      </Button>
    </Stack>
  );
}
