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

export interface CatRecord {
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
  createdAt: Date;
  updatedAt: Date;
}
