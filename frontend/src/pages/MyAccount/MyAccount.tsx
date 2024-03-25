import React from "react";
import { FooterMenu } from "../../features/ButtonAggregation";
import { useUserState } from '../../store/userStore';

const UserProfile: React.FC = () => {
    const { userName, setUserName } = useUserState();
    return (
        <>
            <div>
                <span>{userName} </span>
                <button onClick={() => setUserName('New')}> 名前を更新 </button>
            </div>
        </>
    );
}

const MyAccount = () => {
    return (
        <>
            <h3>Hello MyAccount</h3>
            <FooterMenu />
            <UserProfile />
        </>
    );
}

export default MyAccount;