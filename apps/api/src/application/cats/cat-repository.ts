import { CatGender, CatRecord, CatStatus } from '../../domain/cats/cat.types';
import { PaginatedResponse } from '../common/paginated-response';

export const CAT_REPOSITORY = Symbol('CAT_REPOSITORY');

export interface CatFilters {
  page?: number;
  limit?: number;
  status?: CatStatus;
  gender?: CatGender;
}

export interface CreateCatInput {
  name: string;
  age: number;
  breed?: string;
  description: string;
  status?: CatStatus;
  gender: CatGender;
  imageUrl?: string;
  isVaccinated?: boolean;
  isNeutered?: boolean;
  weight?: number;
}

export type UpdateCatInput = Partial<CreateCatInput>;

export interface CatRepository {
  listCats(filters: CatFilters): Promise<PaginatedResponse<CatRecord>>;
  findCatById(catId: string): Promise<CatRecord | null>;
  createCat(input: CreateCatInput): Promise<CatRecord>;
  updateCat(catId: string, input: UpdateCatInput): Promise<CatRecord>;
  deleteCat(catId: string): Promise<void>;
}
