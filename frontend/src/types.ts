export type UserInformation = {
  UserID: string;
  CreateBingoNum: number;
  FinishedBingoNum: number;
};

export type BingoSquareInformation = {
  storeName: string | undefined;
  src: string | undefined;
};

export type StoreEvaluationProps = {
  taste: number;
  atmosphere: number;
  costPerformance: number;
};
