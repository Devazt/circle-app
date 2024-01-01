import { Box, Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import SideProfile from "@/feature/profile/component/SideProfile";
import Sidebar from "@/components/sidebar";
import Sugestion from "@/feature/suggestion/component/sugestion";
import Sidefooter from "@/components/sidefooter";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {

  return (
    <Flex>
      <Box w={"20%"}>
        <Sidebar />
      </Box>
      <Box w={"50%"}>
        <Outlet />
      </Box>
      <Box w={"30%"} right={0} h={"fit-content"}>
        <SideProfile />
        <Box>
          <Card variant={"filled"} m={4} pb={4}>
            <CardHeader pb={2}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Suggested for you
              </Text>
            </CardHeader>
            <CardBody
              maxH={"300px"}
              overflowY={"scroll"}
              pr={2}
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
            <Sugestion />
            </CardBody>
          </Card>
        </Box>
        <Sidefooter />
      </Box>
    </Flex>
  );
};

export default HomeLayout;
