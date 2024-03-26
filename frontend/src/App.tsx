import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(config);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />

      <Footer />
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
