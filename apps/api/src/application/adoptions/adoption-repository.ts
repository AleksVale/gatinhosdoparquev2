import { AdoptionDetailsRecord, AdoptionStatus } from '../../domain/adoptions/adoption.types';
import { PaginatedResponse, PaginationInput } from '../common/paginated-response';

export const ADOPTION_REPOSITORY = Symbol('ADOPTION_REPOSITORY');

export interface CreateAdoptionInput {
  catId: string;
  adopterId: string;
  notes?: string;
}

export interface UpdateAdoptionInput {
  status?: AdoptionStatus;
  notes?: string;
}

export interface AdoptionRepository {
  listAdoptions(input: PaginationInput): Promise<PaginatedResponse<AdoptionDetailsRecord>>;
  findAdoptionById(adoptionId: string): Promise<AdoptionDetailsRecord | null>;
  createAdoption(input: CreateAdoptionInput): Promise<AdoptionDetailsRecord>;
  updateAdoption(adoptionId: string, input: UpdateAdoptionInput): Promise<AdoptionDetailsRecord>;
}
