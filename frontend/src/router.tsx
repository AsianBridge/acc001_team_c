import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import MyAccount from './pages/MyAccount/MyAccount';
import MyBingo from './pages/MyBingo/MyBingo';
import SignUp from './pages/SignUp/SignUp';

export const Router = () => {
    return (
        <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/MyBingo" element={<MyBingo />} />
            <Route path="/SignUp" element={<SignUp />} />
        </Routes>
    )
}