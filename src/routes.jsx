import { Routes, Route } from "react-router-dom";

import TestPage from "./pages/test";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPasswordSuccess from "./components/auth/ResetPasswordSuccess";
import VerifyOTP from "./pages/auth/VerifyOTP";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password-sucess" element={<ResetPasswordSuccess />} />
    </Routes>
  );
};

export default AppRouter;
