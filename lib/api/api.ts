import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;
export const nextApi = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
