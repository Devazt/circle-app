import { Box, Flex } from "@chakra-ui/react";
import Profile from "@/components/profile";
import Sidebar from "@/components/sidebar";
import Sugestion from "@/components/sugestion";
import Sidefooter from "@/components/sidefooter";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import IUser from "@/types/user";
import API from "@/lib/axios";

const HomeLayout = () => {
  // connect user to profile
    // const [profile, setProfile] = useState<IUser>();
    // const getProfile = async () => {
    //     const res = await API.get(`/user/1`);
    //     const json = await res.data;
    //     setProfile(json.data);
    // };
    // useEffect(() => {
    //     getProfile();
    // }, []);
  return (
    <Flex>
      <Box w={"20%"}>
        <Sidebar />
      </Box>
      <Box w={"50%"}>
        <Outlet />
      </Box>
      <Box w={"30%"} right={0} h={"fit-content"}>
        <Profile
        //  {...profile}
          />
        <Sugestion />
        <Sidefooter />
      </Box>
    </Flex>
  );
};

export default HomeLayout;