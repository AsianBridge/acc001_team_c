import { BrowserRouter } from "react-router-dom";
import Header from "./features/Header";
import Footer from "./features/Footer";
import Router from "./router";
import "../amplify/configureAmplify";
import { Authenticator } from "@aws-amplify/ui-react";

const App = () => {
  return (
    <Authenticator>
      <BrowserRouter>
        <Header />
        <Router />
        <Footer />
      </BrowserRouter>
    </Authenticator>
  );
};

export default App;
