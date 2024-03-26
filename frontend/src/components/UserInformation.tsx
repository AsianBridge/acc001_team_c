import { useUserState } from "../store/UserState";

export const ShowUserId = () => {
  const { userID } = useUserState();
  return <h3>{userID}</h3>;
};

export const SetUserId = ({ NewID }: { NewID?: string }) => {
  const { setUserID } = useUserState();

  const handleClick = () => {
    if (typeof NewID === "string") {
      setUserID(NewID);
    }
  };

  return <button onClick={handleClick}> IDを更新 </button>;
};
