import { Routes, Route } from "react-router-dom";
import IntroPage from "./IntroPage";
import SignUp from "./Signup";
import SignIn from "./Signin";

const Account = () => {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
};

export default Account;
