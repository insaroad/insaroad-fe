import { api } from './axios';

// DTO 타입 정의
export type AnimalType = 'CRANE' | 'HAETAE' | 'TURTLE' | 'TIGER' | 'MAGPIE';

export interface AnimalMissionSubmitRequest {
    userCode: string;
    currentLocationId: string;
    patternAnimals: [AnimalType, AnimalType];
    entranceAnimal: AnimalType;
    paintingAnimal: AnimalType;
}

export interface ResultTextSegment {
    text: string;
    bold?: boolean;
}

export interface DescriptionResponse {
    intro: ResultTextSegment[];
    traits: ResultTextSegment[];
}

export interface AnimalResultResponse {
    animal: string;
    title: string;
    caption: string;
    description: DescriptionResponse;
}

export interface ApiResponse<T> {
    success: boolean;
    code: number;
    message: string;
    data: T;
}

// API 함수
export const submitAnimalMission = async (
    request: AnimalMissionSubmitRequest
): Promise<AnimalResultResponse> => {
    const response = await api.post<ApiResponse<AnimalResultResponse>>('/api/animal-mission/submit', request);
    return response.data.data;
};
