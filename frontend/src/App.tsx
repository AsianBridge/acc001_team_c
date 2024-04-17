import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./components/Auth";

function App() {
  return (
    <BrowserRouter>
      <Auth>
        <Header />
        <Router />
        <Footer />
      </Auth>
    </BrowserRouter>
  );
}

export default App;
