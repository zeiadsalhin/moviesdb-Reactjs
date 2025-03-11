import { Routes, Route } from "react-router-dom";
import IntroPage from "./IntroPage";
import SignUp from "./Signup";
import SignIn from "./Signin";
import ConfirmEmail from "./ConfirmEmail";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ErrorPage from "../404Page";

const Account = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/confirm-email" element={<ConfirmEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Account;
