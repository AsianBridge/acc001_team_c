import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyBingo from "./pages/MyBingo/MyBingo";
import Review from "./pages/Review/Review";
import { Authenticator } from "@aws-amplify/ui-react";
import SignUpForm from "./pages/SignUpForm/SignUpForm";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/MyAccount"
          element={
            <Authenticator>
              <MyAccount />
            </Authenticator>
          }
        />
        <Route
          path="/MyBingo"
          element={
            <Authenticator>
              <MyBingo />
            </Authenticator>
          }
        />
        <Route
          path="/Review"
          element={
            <Authenticator>
              <Review />
            </Authenticator>
          }
        />
        <Route path="/SignUpForm" element={<SignUpForm />} />
      </Routes>
    </>
  );
};

export default Router;
