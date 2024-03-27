import { Button } from "@mui/material";
import { useBingoState } from "../store/ReviewOfBingoState";

export const SetBingoID = ({ newBingoID }: { newBingoID: string }) => {
  const { setBingoID } = useBingoState();

  const handleClick = () => {
    if (typeof newBingoID === "string") {
      setBingoID(newBingoID);
    }
  };

  return <Button onClick={handleClick}>BingoIDを更新</Button>;
};

export const SetStoreID = ({ newStoreID }: { newStoreID: string }) => {
  const { setStoreID } = useBingoState();

  const handleClick = () => {
    if (typeof newStoreID === "string") {
      setStoreID(newStoreID);
    }
  };

  return <Button onClick={handleClick}>StoreIDを更新</Button>;
};
