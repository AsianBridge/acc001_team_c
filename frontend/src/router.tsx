import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyBingo from "./pages/MyBingo/MyBingo";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/MyBingo" element={<MyBingo />} />
    </Routes>
  );
};
