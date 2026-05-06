import { ApplicationError } from '../errors/application-error';
import { AdoptionRepository } from './adoption-repository';

export class GetAdoptionByIdUseCase {
  constructor(private readonly adoptionRepository: AdoptionRepository) {}

  async execute(adoptionId: string) {
    const adoptionRecord = await this.adoptionRepository.findAdoptionById(adoptionId);

    if (!adoptionRecord) {
      throw new ApplicationError('not_found', `Adoption with id "${adoptionId}" not found`);
    }

    return adoptionRecord;
  }
}
