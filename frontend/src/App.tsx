import { BrowserRouter } from "react-router-dom";
import Header from "./features/Header";
import Footer from "./features/Footer";
import Router from "./router";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import "../amplify/configureAmplify";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
