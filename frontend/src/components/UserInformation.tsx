import { useUserState } from "../store/userStore";

export const UserProfile = () => {
  const { userID } = useUserState();
  return <h3>{userID}</h3>;
};

export const SetUserId = ({ NewID }: { NewID?: string }) => {
  const { setUserName } = useUserState();

  const handleClick = () => {
    if (typeof NewID === "string") {
      setUserName(NewID);
    }
  };

  return <button onClick={handleClick}> IDを更新 </button>;
};
