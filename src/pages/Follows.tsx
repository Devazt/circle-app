import FollowsTab from "@/feature/follow/component/FollowsTab";
import { Heading } from "@chakra-ui/react";

export default function Follows() {
  return (
    <>
        <Heading size={"xl"} p={4} borderX={'1px'} borderColor={'gray.500'}>Follows</Heading>
        <FollowsTab />
    </>
  )
}
