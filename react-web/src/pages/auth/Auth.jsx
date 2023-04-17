import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import RegisterPage from "./Register";

const Auth = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Navigate to="/auth/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path={"*"} element={<Navigate to="/auth/" />} />
    </Routes>
  );
};

export default Auth;
