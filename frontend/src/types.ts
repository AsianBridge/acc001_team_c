import { Dispatch, SetStateAction } from "react";

//複数のファイルで使用するtype一覧

export type StoreViewProps = {
  taste?: number;
  atmosphere?: number;
  costPerformance?: number;
};

export type SetStoreViewProps = StoreViewProps & {
  setTaste: Dispatch<SetStateAction<number>>;
  setAtmosphere: Dispatch<SetStateAction<number>>;
  setCostPerformance: Dispatch<SetStateAction<number>>;
};

export type BingoSquareModalProps = {
  atmosphere?: number;
  costPerformance?: number;
  src?: string;
  storeName: string;
};

export interface getReviewType {
  statusCode: number;
  body: getReviewProps;
}

type getReviewProps = {
  review: string;
  star_atmosphere: string;
  star_cp: string;
  star_taste: string;
};

export interface getBingoInformationType {
  body: string;
  stateCode: number;
}

export type ReviewInformation = {
  bingoId: string;
  userId: string;
  caption: string;
  starTaste?: number;
  starAtmosphere?: number;
  starCP?: number;
  store_number: number;
};

export type Reviewer = {
  userId: string;
  bingoId: string;
  storeNumber: string;
};

export type postACProps = {
  birthday_day: string;
  birthday_month: string;
  birthday_year: string;
  mail_address: string;
  password: string;
  residence: string;
  userId: string;
};
