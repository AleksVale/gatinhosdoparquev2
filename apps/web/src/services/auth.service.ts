import type { AuthResponseDto, LoginDto } from '@repo/types';
import { api } from './api';

export const authService = {
  login: async (credentials: LoginDto): Promise<AuthResponseDto> => {
    const response = await api.post<AuthResponseDto>('/v1/auth/login', credentials);
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};
