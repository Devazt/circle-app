import { Box, Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import Profile from "@/feature/profile/component/ProfileCard";
import Sidebar from "@/components/sidebar";
import Sugestion from "@/components/sugestion";
import Sidefooter from "@/components/sidefooter";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { IUser } from "@/types/user";
import { API, setAuthToken } from "@/lib/api";

const HomeLayout = () => {

  // connect user to profile
  const [profile, setProfile] = useState<IUser>();
  const getProfile = async () => {
    setAuthToken(localStorage.token);
    const response = await API.get("/auth/check");
    const res = await API.get(`/user/` + response.data.user.id);
    const json = await res.data;
    setProfile(json.user);
  };

  useEffect(() => {
    getProfile();
  }, []);

  // connect user to sugestion
  const [sugestion, setSugestion] = useState<IUser[]>();
  const getSugestion = async () => {
    const res = await API.get(`/user`);
    const json = await res.data;
    setSugestion(json.users);
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
        <Box>
          <Card variant={"filled"} m={4}>
            <CardHeader pb={0}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Suggested for you
              </Text>
            </CardHeader>
            <CardBody pt={2} overflow={"hidden"}>
              {sugestion != undefined &&
                sugestion.map((s: IUser) => {
                  return <Sugestion key={s.id} {...s} />;
                })}
            </CardBody>
          </Card>
        </Box>
        <Sidefooter />
      </Box>
    </Flex>
  );
};

export default HomeLayout;
