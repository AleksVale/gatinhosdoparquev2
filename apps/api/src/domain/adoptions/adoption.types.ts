import { CatRecord } from '../cats/cat.types';
import { PublicUserRecord } from '../users/user.types';

export enum AdoptionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface AdoptionRecord {
  id: string;
  catId: string;
  adopterId: string;
  status: AdoptionStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdoptionDetailsRecord extends AdoptionRecord {
  cat: CatRecord;
  adopter: PublicUserRecord;
}
