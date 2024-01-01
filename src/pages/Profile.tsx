import ProfileTabs from '@/feature/profile/component/ProfileTabs'
import { Heading } from '@chakra-ui/react'

export default function Profile() {
  return (
    <>
    <Heading size={"xl"} p={4} borderX={'1px'} borderColor={'gray.500'}>
        Profile
    </Heading>
    <ProfileTabs />
    </>
  )
}
