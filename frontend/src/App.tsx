import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import Header from "./features/Header";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import Footer from "./features/Footer";

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

export default App;
