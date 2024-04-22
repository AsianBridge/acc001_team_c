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
} & StoreViewProps;

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

type starAtmospheres = {
  star_atmosphere_1: string;
  star_atmosphere_2: string;
  star_atmosphere_3: string;
  star_atmosphere_4: string;
  star_atmosphere_5: string;
  star_atmosphere_6: string;
  star_atmosphere_7: string;
  star_atmosphere_8: string;
  star_atmosphere_9: string;
};

type starCpes = {
  star_cp_1: string;
  star_cp_2: string;
  star_cp_3: string;
  star_cp_4: string;
  star_cp_5: string;
  star_cp_6: string;
  star_cp_7: string;
  star_cp_8: string;
  star_cp_9: string;
};

type starTastes = {
  star_taste_1: string;
  star_taste_2: string;
  star_taste_3: string;
  star_taste_4: string;
  star_taste_5: string;
  star_taste_6: string;
  star_taste_7: string;
  star_taste_8: string;
  star_taste_9: string;
};

export interface getDoneBingoIdType {
  statusCode: number;
  body: { user_id: string; flag: string; bingo_id: number } | string;
}

export interface getMyBingoIdType {
  statusCode: number;
  body: string;
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

export interface ReviewInformation {
  statusCode: number;
  body: {
    star_atmosphere_2: string;
    star_cp: string;
    star_taste: string;
    review: string;
  };
}

export interface BingoInformation {
  goodNumber: number;
}
