import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/home";
import HomeLayout from "@/layouts/HomeLayout";
import Details from "@/pages/statusDetails";
import AuthPage from "@/layouts/AuthLayout";
import Login from "@/feature/auth/component/FormLogin";
import Register from "@/feature/auth/component/FormRegister";
import { useSelector } from "react-redux";
import { RootState } from "./store/types/rootState";
import React from "react";
import { API, setAuthToken } from "./lib/api";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./store/rootReducer";
import { Text } from "@chakra-ui/react";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");

      dispatch(AUTH_CHECK(response.data));
      setIsLoading(false);
    } catch (error) {
      dispatch(AUTH_ERROR());
      setIsLoading(false);
      navigate("/auth/login");
    }
  }

  React.useEffect(() => {
    authCheck();
  }, []);

  function IsLogin() {
    console.log(auth.username, "ini login");
    if (!auth.username) {
      return <Navigate to="/auth/login" />;
    }

    return <Outlet />;
  }

  function IsNotLogin() {
    console.log(auth.username, "ini notlogin");
    if (auth.username) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  }

  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
          </Route>
          <Route path="/auth" element={<AuthPage />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<IsLogin />}>
            <Route path="/*" element={<HomeLayout />} />
          </Route>
          <Route element={<IsNotLogin />}>
            <Route path="/*" element={<HomeLayout />} />
          </Route>
        </Routes>
      )}
    </>
  );
}
