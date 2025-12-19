import { api } from './axios';
import type { ApiResponse } from './animalMission';

export interface QuizResponse {
  id: number;
  questionImageUrl: string;
  choice1: string;
  choice2: string;
  choice3: string;
  correctChoice: number;
}

export interface AnswerRequest {
  userCode: string;
  currentLocationId: number;
  userAnswer: number;
}

export interface AnswerResponse {
  isCorrect: boolean;
  answerImageUrl: string;
  currentStage: number;
}

export const hangulSignAPI = {
  // 랜덤 퀴즈 가져오기
  getRandomQuiz: async (): Promise<QuizResponse> => {
    const response = await api.get<ApiResponse<QuizResponse>>('/api/hangul-sign/quizzes/random');
    return response.data.data;
  },

  // 정답 제출
  submitAnswer: async (quizId: number, request: AnswerRequest): Promise<AnswerResponse> => {
    const response = await api.post<ApiResponse<AnswerResponse>>(`/api/hangul-sign/quizzes/${quizId}/answer`, request);
    return response.data.data;
  },
};
