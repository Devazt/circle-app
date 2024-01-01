import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ProfileCredentialForm from "./ProfileCredentialForm";
import ProfileUser from "./ProfileUser";

export default function ProfileTabs() {
  return (
    <Box
      borderX={"1px"}
      borderColor={"gray.500"}
      h={"full"}
      px={4}
    >
      <Tabs isFitted variant="enclosed" colorScheme={"green"}>
        <TabList>
          <Tab>My Profile</Tab>
          <Tab>Credential</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="green.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <ProfileUser />
          </TabPanel>
          <TabPanel>
            <ProfileCredentialForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
