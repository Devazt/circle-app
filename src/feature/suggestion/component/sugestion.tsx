import {
  Box,
  Spinner,
  Card,
} from "@chakra-ui/react";
// import { useState } from "react";
import useSugestion from "../hook/useSugestion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/types/rootState";
import SugestFollow from "./SugestFollow";

export default function Sugestion() {
  const { sugestion, isLoading } = useSugestion();
  const userLogin = useSelector((state: RootState) => state?.auth)

  const list = sugestion?.filter((user: any) => user.id !== userLogin.id)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card bg="whiteAlpha.200" p={4} minW="380px">
      <Box
      h="15rem"
      overflowY={"scroll"}
      css={{
        '&::-webkit-scrollbar': {
        display: 'none',
        }}}
      >  
        {list.map((user: any) => (
          <SugestFollow
            user={user.id}
            username={user.username}
            fullname={user.fullname}
            photo_profile={user.photo_profile}
            key={user.id}
          />
        ))}
      </Box>
    </Card>
  );
}
