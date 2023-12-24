import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
    return (
        <>
        <Box h={"300px"} w={"500px"} mx={"auto"} mt={"80px"}>
        <Outlet />
        </Box>
        </>
    )
}