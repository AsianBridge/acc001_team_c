import apiClient from "./apiClient";
import { getDoneBingoIdType } from "../types";

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
    userInformation: userId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getKeepBingoIdByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_STORE",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getMakedBingoIdByUserId = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_STORE",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const postReview = async (review: Review) => {
  const postData = {
    httpMethod: "POST_REVIEW",
    ...review,
  };
  const response = await apiClient.post<Review>("", postData);
  return response.data;
};

const getStoreById = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_STORE",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const postMyBingo = async (review: Review) => {
  const postData = {
    httpMethod: "POST_REVIEW",
    ...review,
  };
  const response = await apiClient.post<Review>("", postData);
  return response.data;
};

const getBingo = async (review: Review) => {
  const postData = {
    httpMethod: "POST_REVIEW",
    ...review,
  };
  const response = await apiClient.post<Review>("", postData);
  return response.data;
};

type Review = {
  bingoId: string;
  userId: string;
  storeId: string;
  caption: string;
  starTaste: number;
  starAtmosphere: number;
  starCP: number;
};

const api = {
  getACByUserId,
  postACByUserAC,
  confirmationIdByUserId,
  getDoneBingoIdByUserId,
  getMyBingoByUserId,
  getKeepBingoIdByUserId,
  getMakedBingoIdByUserId,
  postReview,
  getStoreById,
  postMyBingo,
  getBingo,
};

export default api;
