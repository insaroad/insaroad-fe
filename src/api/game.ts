import { api, type ApiResponse } from "./client";

export type GameStartData = {
  userCode: string;
  startStage: number;
};

export async function startGame(): Promise<GameStartData> {
  const res = await api.post<ApiResponse<GameStartData>>("/api/games/start");
  return res.data.data;
}