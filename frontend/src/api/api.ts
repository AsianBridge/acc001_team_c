import apiClient from "./apiClient";
import {
  getBingoInformationType,
  getReviewType,
  postACProps,
  Reviewer,
  ReviewInformation,
} from "../types";

interface getGoodInformationType {
  body: number;
  stateCode: number;
}

interface getBingoInformationOfHomeType {
  body: BingoInformationOfBodyType[];
  stateCode: number;
}

interface BingoInformationOfBodyType {
  user_id: string;
  bingo_id: number;
  flag: number;
  [key: `pi_${number}`]: string;
  [key: `store_name_${number}`]: string;
}

type getACConfirmationId = {
  body: string;
  statusCode: number;
};

const getACByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_AC",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const postACByUserAC = async (postAC: postACProps) => {
  const postData = {
    httpMethod: "POST_AC",
    ...postAC,
  };
  const response = await apiClient.post<string[]>("", postData);
  return response.data;
};

const confirmationIdByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "CONFIRMATION_ID",
    userId: userId,
  };
  const response = await apiClient.post<getACConfirmationId>("", postData);
  return response.data;
};

const postKeepByUserId = async (
  userId: string,
  bingoId: string,
  contributorId: string,
) => {
  const postData = {
    httpMethod: "POST_KEEP",
    userId: userId,
    bingoId: bingoId,
    contributorId: contributorId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getDoneBingoIdByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_DONE_BINGO",
    userId: userId,
  };
  const response = await apiClient.post<getBingoInformationType[]>(
    "",
    postData,
  );
  return response.data;
};

const getMyBingoByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_MYBINGO",
    userId: userId,
  };
  const response = await apiClient.post<getBingoInformationType>("", postData);
  return response.data;
};

const postGoodByBingoId = async (goodNum: number, bingoId: string) => {
  const postData = {
    httpMethod: "POST_GOOD",
    good_number: goodNum,
    bingoId: bingoId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getKeepBingoIdByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_KEEP_BINGO",
    userId: userId,
  };
  const response = await apiClient.post<getBingoInformationType[]>(
    "",
    postData,
  );
  return response.data;
};

const getMadeBingoIdByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_MAKED_BINGO",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getGoodByBingoId = async (bingoId: string) => {
  const postData = {
    httpMethod: "GET_GOOD",
    bingoId: bingoId,
  };
  const response = await apiClient.post<getGoodInformationType>("", postData);
  return response.data;
};

const postPlayBingo = async (
  userId: string,
  bingoId: string,
  contributorId: string,
) => {
  const postData = {
    httpMethod: "POST_PLAY",
    userId: userId,
    bingoId: bingoId,
    contributorId: contributorId,
  };
  const response = await apiClient.post("", postData);
  return response;
};

const postReview = async (review: ReviewInformation) => {
  const postData = {
    httpMethod: "POST_REVIEW",
    bingoId: review.bingoId,
    userId: review.userId,
    caption: review.caption,
    starTaste: review.starTaste,
    starAtmosphere: review.starAtmosphere,
    starCP: review.starCP,
    store_number: review.store_number,
  };
  const response = await apiClient.post("", postData);
  return response.data;
};

const sendImageToServer = async (
  bingoId: string,
  userId: string,
  storeNumber: string,
  base64: string,
) => {
  const postData = {
    httpMethod: "POST_IMAGE",
    bingoId: bingoId,
    userId: userId,
    store_number: storeNumber,
    image: base64,
  };
  const response = await apiClient.post("", postData);
  return response.data;
};

const postMyBingo = async (userId: string, bingoId: string) => {
  const postData = {
    httpMethod: "POST_MYBINGO",
    userId,
    bingoId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getBingo = async (userID: string) => {
  const postData = {
    httpMethod: "GET_BINGO",
    userId: userID,
  };
  const response = await apiClient.post<getBingoInformationOfHomeType>(
    "",
    postData,
  );
  return response.data;
};

const getStoreIdByBingoId = async (bingoId: string) => {
  const postData = {
    httpMethod: "GET_STORE_ID",
    storeId: bingoId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getReview = async (Reviewer: Reviewer) => {
  const postData = {
    httpMethod: "GET_REVIEW",
    ...Reviewer,
  };
  const response = await apiClient.post<getReviewType>("", postData);
  return response.data;
};

const api = {
  getACByUserId,
  postACByUserAC,
  confirmationIdByUserId,
  postKeepByUserId,
  getDoneBingoIdByUserId,
  getMyBingoByUserId,
  postGoodByBingoId,
  getKeepBingoIdByUserId,
  getMadeBingoIdByUserId,
  getGoodByBingoId,
  postPlayBingo,
  postReview,
  sendImageToServer,
  postMyBingo,
  getBingo,
  getStoreIdByBingoId,
  getReview,
};

export default api;
