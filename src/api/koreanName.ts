import { api, type ApiResponse } from "./client";
import { storage } from "@/utils/storage";

export type KoreanNameGender = "MALE" | "FEMALE";

export type KoreanNameRecommendRequest = {
  birthDate: string; // "YYYY-MM-DD"
  gender: KoreanNameGender;
  completeRequest: {
    userCode: string;
    currentLocationId: number; // 기본 1
  };
};

export type KoreanNameSyllable = {
  syllable: string;
  romanization: string;
  elementType: string;
  description: string;
};

export type KoreanNameRecommendResult = {
  koreanName: string;
  romanizedName: string;
  elementImageUrl: string;
  overallExplanation: string;
  syllables: KoreanNameSyllable[];
  // 나머지 필드는 받아도 되지만 화면에 안 씀
  mainElementType?: string;
  elementDescription?: string;
};

export async function recommendKoreanName(input: {
  birthDate: string;
  gender: KoreanNameGender;
}): Promise<KoreanNameRecommendResult> {
  const userCode = storage.getUserCode();
  if (!userCode) {
    throw new Error("userCode not found in localStorage");
  }

  const body: KoreanNameRecommendRequest = {
    birthDate: input.birthDate,
    gender: input.gender,
    completeRequest: {
      userCode,
      currentLocationId: 1, // ✅ 요구사항: 프론트에서 기본 1로 자동 포함
    },
  };

  const res = await api.post<ApiResponse<KoreanNameRecommendResult>>(
    "/api/korean-names/recommend",
    body
  );

  return res.data.data;
}