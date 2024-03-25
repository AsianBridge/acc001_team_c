import { useUserState } from "../store/userStore";

export const UserProfile = () => {
    const { userName } = useUserState();
    return (
        <h3>{userName}</h3>
    );
}

export const SetUserId = ({ NewName }: { NewName?: string }) => {
    const { setUserName } = useUserState();

    const handleClick = () => {
        if (typeof NewName === 'string') { // NewName が文字列かどうかを確認
            setUserName(NewName);
        }
    };

    return (
        <button onClick={handleClick}> 名前を更新 </button>
    );
}