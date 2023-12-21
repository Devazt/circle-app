import Reply from "@/components/reply";
import ThreadDetails from "@/components/threadDetails";
import { Box, Flex } from "@chakra-ui/react";
// import API from "@/lib/axios";
// import IFeed from "@/types/thread";
// import { useState, useEffect } from "react";
// import data from "@/mocks/feed.json"

export default function Details() {
    
//   const [details, setDetails] = useState<IFeed>();
//   const getDetails = async () => {
//     const res = await API.get("/thread/1");
//     const json = await res.data;
//     setDetails(json.data);
// //   };
//   const [details, setDetails] = useState<IFeed[]>();
//   useEffect(() => {
//     setDetails(data);
//   }, []);
    return(
      <Flex>
        <Box>
        <ThreadDetails />
        </Box>
        <Box>
        <Reply />
        </Box>
      </Flex>
    )
}