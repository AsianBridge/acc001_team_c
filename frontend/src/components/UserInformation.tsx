import { useUserState } from "../store/UserState";

export const ShowUserId = () => {
  const { userID } = useUserState();
  return <>{userID}</>;
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
