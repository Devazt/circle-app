import { Box, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Following from './Following'
import Follower from './Follower'

export default function FollowsTab() {
  return (
    <Box
    borderX={"1px"}
    borderColor={"gray.500"}
    h={"full"}
    px={4}
  >
    <Tabs isFitted variant="enclosed" colorScheme={"green"}>
      <TabList>
        <Tab>Following</Tab>
        <Tab>Follower</Tab>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="green.500"
        borderRadius="1px"
      />
      <TabPanels>
        <TabPanel>
            <Following />
        </TabPanel>
        <TabPanel>
            <Follower />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
  )
}
