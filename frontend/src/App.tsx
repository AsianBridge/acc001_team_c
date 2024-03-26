<<<<<<< Updated upstream
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";
=======
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Router } from './router';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
>>>>>>> Stashed changes

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
