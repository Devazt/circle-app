import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import HomeLayout from "./layouts/HomeLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index={true} element={<Home />} />
        <Route path=":id" element={<>hehehehhe</>} />
      </Route>
    </Routes>
  );
}
