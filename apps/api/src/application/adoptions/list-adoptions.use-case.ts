import { PaginationInput } from '../common/paginated-response';
import { AdoptionRepository } from './adoption-repository';

export class ListAdoptionsUseCase {
  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  execute(input: PaginationInput) {
    return this.adoptionRepository.listAdoptions(input);
  }
}
