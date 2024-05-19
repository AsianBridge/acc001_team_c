import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyBingo from "./pages/MyBingo/MyBingo";
import Review from "./pages/Review/Review";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/MyAccount" element={<MyAccount />} />
      <Route path="/MyBingo" element={<MyBingo />} />
      <Route path="/Review" element={<Review />} />
    </Routes>
  );
};

export default Router