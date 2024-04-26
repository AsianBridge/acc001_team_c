import { Dispatch, SetStateAction } from "react";
import { Area, MediaSize } from "react-easy-crop";

export type UserInformation = {
  UserID: string;
  CreateBingoNum: number;
  FinishedBingoNum: number;
};

export type BingoSquareInformation = {
  storeName?: string;
  src?: string;
};

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
  src?: string;
  storeName: string;
};

export type UserState = {
  userID: string;
  setUserID: (newID: string) => void;
};

export type BingoState = {
  BingoID?: string;
  StoreID?: string;
  setBingoID: (newBingoID?: string) => void;
  setStoreID: (newStoreID?: string) => void;
};

export type CroppedImageState = {
  croppedImgSrc: string;
  setCroppedImgSrc: (newCroppedImgSrc: string) => void;
};

export type CaptionProps = {
  caption: string;
  setCaption: Dispatch<SetStateAction<string>>;
};

export type CropperModalProps = {
  crop: {
    x: number;
    y: number;
  };
  setCrop: (crop: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  showCroppedImage: () => void;
  onMediaLoaded: (mediaSize: MediaSize) => void;
  minZoom: number;
};

export interface getDoneBingoIdType {
  statusCode: number;
  body: { user_id: string; flag: string; bingo_id: number } | string;
}

export interface getMyBingoIdType {
  statusCode: number;
  body: string;
}

export interface getReviewType {
  statusCode: number;
  body: getReviewProps;
}

export interface getMyBingoIdsBodyType {
  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  picture6: string;
  picture7: string;
  picture8: string;
  picture9: string;
}

export interface BingoInformation {
  goodNumber: number;
}

export type ReviewInformation = {
  caption: string;
  starTaste: number;
  starAtmosphere: number;
  starCP: number;
};

export type Reviewer = {
  userId: string;
  bingoId: string;
  storeNumber: string;
};

export type getReviewProps = {
  review: string;
  star_atmosphere: string;
  star_cp: string;
  star_taste: string;
};
