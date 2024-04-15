import { getDoneBingoIdType } from "../types";
import apiClient from "./apiClient";

const getStoreById = async (storeId: string) => {
  const postData = {
    httpMethod: "GET_STORE",
    storeId: storeId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getMyBingoByUserId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_MYBINGO",
    userId: userId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const confirmationId = async (userId: string) => {
  const postData = {
    httpMethod: "CONFIRMATION_ID",
    userId: userId,
  };
  const response = await apiClient.post<string>("", postData);
  return response.data;
};

const getDoneBingoId = async (userId: string) => {
  const postData = {
    httpMethod: "GET_DONE_BINGO",
    userId: userId,
  };
  const response = await apiClient.post<getDoneBingoIdType[]>("", postData);
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

const postReview = async (review: Review) => {
  const postData = {
    httpMethod: "POST_REVIEW",
    ...review,
  };
  const response = await apiClient.post<Review>("", postData);
  return response.data;
};

const api = {
  getStoreById,
  getMyBingoByUserId,
  confirmationId,
  postReview,
  getDoneBingoId,
};

export default api;
