import { useBingoState } from "./ReviewOfBingoState";
import { useUserState } from "./UserState";

const setBingoID = ({ newBingoID }: { newBingoID: string }) => {
  const { setBingoID } = useBingoState();

  if (typeof newBingoID === "string") {
    setBingoID(newBingoID);
  }
};

const getBingoID = () => {
  const { BingoID } = useBingoState();
  return BingoID;
};

const setStoreID = ({ newStoreID }: { newStoreID: string }) => {
  const { setStoreID } = useBingoState();
  if (typeof newStoreID === "string") {
    setStoreID(newStoreID);
  }
};

const getUserId = () => {
  const { userID } = useUserState();
  return userID;
};

const setUserId = ({ NewID }: { NewID?: string }) => {
  const { setUserID } = useUserState();
  if (typeof NewID === "string") {
    setUserID(NewID);
  }
};

const globalState = {
  setBingoID,
  getBingoID,
  setStoreID,
  getUserId,
  setUserId,
};

export default globalState;
