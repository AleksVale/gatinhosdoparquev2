import { useQuery } from '@tanstack/react-query';
import { catsService } from '../services/cats.service';

interface UseCatsParams {
  page?: number;
  limit?: number;
  status?: string;
  gender?: string;
}

export function useCats(params?: UseCatsParams) {
  return useQuery({
    queryKey: ['cats', params],
    queryFn: () => catsService.getAll(params),
  });
}

export function useCat(id: string) {
  return useQuery({
    queryKey: ['cats', id],
    queryFn: () => catsService.getById(id),
    enabled: !!id,
  });
}
