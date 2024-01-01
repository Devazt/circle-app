import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function Spinner() {
  return (
    <Box>
        <Box color={"gray.100"} p={6}>
            <SkeletonCircle size={"10"} />
            <Skeleton boxSize={"100px"} mt={4} />
            <SkeletonText mt={4} noOfLines={2} spacing={4} skeletonHeight={2}/>
        </Box>
        <Box color={"gray.100"} p={6}>
            <SkeletonCircle size={"10"} />
            <Skeleton boxSize={"100px"} mt={4} />
            <SkeletonText mt={4} noOfLines={2} spacing={4} skeletonHeight={2}/>
        </Box>
    </Box>
  )
}
