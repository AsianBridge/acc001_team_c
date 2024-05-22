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

export type bingoStoreIds = {
  bingo_id: string;
  good_number: number;
  maker_id: string;
  [key: `store_id_${number}`]: string;
  // store_id_1: string;
  // store_id_2: string;
  // store_id_3: string;
  // store_id_4: string;
  // store_id_5: string;
  // store_id_6: string;
  // store_id_7: string;
  // store_id_8: string;
  // store_id_9: string;
};
