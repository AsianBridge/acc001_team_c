import { Dispatch, SetStateAction } from "react";

export type UserInformation = {
  UserID: string;
  CreateBingoNum: number;
  FinishedBingoNum: number;
};

export type BingoSquareInformation = {
  storeName?: string;
  src?: string;
};

export type StoreEvaluationProps = {
  taste?: number;
  atmosphere?: number;
  costPerformance?: number;
};

export type SetStoreEvaluationProps = StoreEvaluationProps &
{
  setTaste: Dispatch<SetStateAction<number>>
  setAtmosphere: Dispatch<SetStateAction<number>>
  setCostPerformance: Dispatch<SetStateAction<number>>
}

export type BingoSquareModalProps = {
  src?: string;
  storeName: string;
} & StoreEvaluationProps;

export type UserState = {
  userID?: string;
  setUserID: (newID?: string) => void;
};

export type BingoState = {
  BingoID?: string;
  StoreID?: string;
  setBingoID: (newBingoID?: string) => void;
  setStoreID: (newStoreID?: string) => void;
};
