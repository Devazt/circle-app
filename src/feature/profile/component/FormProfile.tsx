import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function FormProfile() {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate(`/`);
    }
  return (
    <Box 
    p={5}
    m={4}>
      <Button
        onClick={handleNavigate}
        colorScheme={"green"}
        rounded={"full"}
      >
        <BiArrowBack size={20} /> Edit Profile
      </Button>
      <FormControl>
        <form>
          <Box mt={4}>
            <Text>Photo Profile</Text>
            <Box
              w={"200px"}
              h={"200px"}
              bgImage={"https://bit.ly/dan-abramov"}
              bgPosition={"center"}
              bgRepeat={"no-repeat"}
              bgSize={"cover"}
              borderRadius={"10"}
              border={"1px"}
              borderColor={"gray.500"}
            />
          </Box>
          <Input placeholder="Full Name" />
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
          <Button type="submit">Submit</Button>
        </form>
      </FormControl>
    </Box>
  );
}
