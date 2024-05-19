import { Routes } from "react-router-dom";
import Header from "./features/Header";
import Footer from "./features/Footer";
import Router from "./router";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import './amplify/configureAmplify';

const App = ()=>  {
  return (
    <Routes>
      <Header />
      <Router />
      <Footer />
    </Routes>
  );
}

export default (App);
