export enum CatStatus {
  AVAILABLE = 'AVAILABLE',
  ADOPTED = 'ADOPTED',
  IN_TREATMENT = 'IN_TREATMENT',
  RESERVED = 'RESERVED',
}

export enum CatGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface CreateCatDto {
  name: string;
  age: number;
  breed?: string;
  description: string;
  status: CatStatus;
  gender: CatGender;
  imageUrl?: string;
  isVaccinated: boolean;
  isNeutered: boolean;
  weight?: number;
}

export type UpdateCatDto = Partial<CreateCatDto>;

export interface CatResponseDto {
  id: string;
  name: string;
  age: number;
  breed: string | null;
  description: string;
  status: CatStatus;
  gender: CatGender;
  imageUrl: string | null;
  isVaccinated: boolean;
  isNeutered: boolean;
  weight: number | null;
  createdAt: string;
  updatedAt: string;
}
