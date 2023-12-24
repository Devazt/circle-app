import { Box, Flex } from "@chakra-ui/react";
import Profile from "@/components/profile";
import Sidebar from "@/components/sidebar";
import Sugestion from "@/components/sugestion";
import Sidefooter from "@/components/sidefooter";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { IUser } from "@/types/user";
import { API } from "@/lib/api";

const HomeLayout = () => {
  // connect user to profile
    const [profile, setProfile] = useState<IUser>();
    const getProfile = async () => {
        const res = await API.get(`/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        const json = await res.data;
        console.log(res.data)
        setProfile(json.data);
    };
    useEffect(() => {
        getProfile();
    }, []);

  // connect user to sugestion
    const [sugestion, setSugestion] = useState<IUser[]>();
    const getSugestion = async () => {
        const res = await API.get(`/user`);
        const json = await res.data;
        setSugestion(json.data);
    };
    useEffect(() => {
        getSugestion();
    }, []);

  return (
    <Flex>
      <Box w={"20%"}>
        <Sidebar />
      </Box>
      <Box w={"50%"}>
        <Outlet />
      </Box>
      <Box w={"30%"} right={0} h={"fit-content"}>
        {profile != undefined && <Profile {...profile} />}
        {sugestion != undefined && sugestion.map((s: IUser) => {
          return (
            <Sugestion key={s.id} {...s} />
          );
        })}
        <Sidefooter />
      </Box>
    </Flex>
  );
};

export default HomeLayout;