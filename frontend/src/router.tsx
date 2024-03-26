import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyBingo from "./pages/MyBingo/MyBingo";
import SignUp from "./pages/SignUp/SignUp";
import Review from "./pages/Review/Review";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/MyBingo" element={<MyBingo />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Review" element={<Review />} />
    </Routes>
  );
};
