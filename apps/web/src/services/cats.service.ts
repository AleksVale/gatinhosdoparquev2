import type { CatResponseDto, PaginatedResponseDto } from '@repo/types';
import { api } from './api';

type CatQueryParams = {
  page?: number;
  limit?: number;
  status?: string;
  gender?: string;
};

export const catsService = {
  getAll: async (params?: CatQueryParams): Promise<PaginatedResponseDto<CatResponseDto>> => {
    const response = await api.get<PaginatedResponseDto<CatResponseDto>>('/v1/cats', { params });
    return response.data;
  },

  getById: async (id: string): Promise<CatResponseDto> => {
    const response = await api.get<CatResponseDto>(`/v1/cats/${id}`);
    return response.data;
  },
};
