import { Button } from "@mui/material";
import { useBingoState } from "../store/ReviewOfBingoState";

export const ShowBingoID = () => {
  const { BingoID } = useBingoState();
  return <h3>{BingoID}</h3>;
};

export const ShowStoreID = () => {
  const { StoreID } = useBingoState();
  return <h3>{StoreID}</h3>;
};

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
