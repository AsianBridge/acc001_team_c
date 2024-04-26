import apiClient from "./apiClient";
import {
  getDoneBingoIdType,
  getMyBingoIdType,
  getReviewType,
  Reviewer,
} from "../types";

// まだAPIは完全に完成していないです。

const getACByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_AC",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const postACByUserAC = async (storeId: string[]) => {
  const postData = {
    httpMethod: "POST_AC",
    storeId: storeId,
  };
  const response = await apiClient.post<string[]>("", postData);
  return response.data;
};

const confirmationIdByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "CONFIRMATION_ID",
    userId: userId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getDoneBingoIdByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_DONE_BINGO",
    userId: userId,
  };
  const response = await apiClient.post<getDoneBingoIdType[]>("", postData);
  return response.data;
};

const getMyBingoByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_MYBINGO",
    userId: userId,
  };
  const response = await apiClient.post<getMyBingoIdType>("", postData);
  return response.data;
};

const getKeepBingoIdByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_KEEP_BINGO",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getMakedBingoIdByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_MAKED_BINGO",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

// const postReview = async (review: Review) => {
//   const postData = {
//     httpMethod: "POST_REVIEW",
//     ...review,
//   };
//   const response = await apiClient.post<Review>("", postData);
//   return response.data;
// };

// const getStoreById = async (storeId: string) => {
//   const postData = {
//     httpMethod: "GET_STORE",
//     storeId: storeId,
//   };
//   const response = await apiClient.post<string>("", postData);
//   return response.data;
// };

// const postMyBingo = async (review: Review) => {
//   const postData = {
//     httpMethod: "POST_REVIEW",
//     ...review,
//   };
//   const response = await apiClient.post<Review>("", postData);
//   return response.data;
// };

const getBingo = async () => {
  const postData = {
    httpMethod: "GET_BINGO",
  };
  const response = await apiClient.post("", postData);
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
  getDoneBingoIdByUserId,
  getMyBingoByUserId,
  getKeepBingoIdByUserId,
  getMakedBingoIdByUserId,
  // postReview,
  // getStoreById,
  // postMyBingo,
  getBingo,
  getStoreIdByBingoId,
  getReview,
};

export default api;
