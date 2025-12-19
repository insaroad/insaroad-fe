import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "https://api.danchu.site",
  headers: { "Content-Type": "application/json" },
});

export type ApiResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};