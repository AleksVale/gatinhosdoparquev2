export enum AdoptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CreateAdoptionDto {
  catId: string;
  adopterId: string;
  notes?: string;
}

export type UpdateAdoptionDto = Partial<Pick<CreateAdoptionDto, 'notes'>> & {
  status?: AdoptionStatus;
};

export interface AdoptionResponseDto {
  id: string;
  catId: string;
  adopterId: string;
  status: AdoptionStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
