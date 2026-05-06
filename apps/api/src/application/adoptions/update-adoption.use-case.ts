import { ApplicationError } from '../errors/application-error';
import { AdoptionRepository, UpdateAdoptionInput } from './adoption-repository';

export class UpdateAdoptionUseCase {
  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  async execute(adoptionId: string, input: UpdateAdoptionInput) {
    const adoptionRecord = await this.adoptionRepository.findAdoptionById(adoptionId);

    if (!adoptionRecord) {
      throw new ApplicationError('not_found', `Adoption with id "${adoptionId}" not found`);
    }

    return this.adoptionRepository.updateAdoption(adoptionId, input);
  }
}
