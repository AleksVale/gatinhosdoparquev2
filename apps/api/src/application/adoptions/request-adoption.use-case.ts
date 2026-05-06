import { CatStatus } from '../../domain/cats/cat.types';
import { CatRepository } from '../cats/cat-repository';
import { ApplicationError } from '../errors/application-error';
import { AdoptionRepository, CreateAdoptionInput } from './adoption-repository';

export class RequestAdoptionUseCase {
  constructor(
    private readonly adoptionRepository: AdoptionRepository,
    private readonly catRepository: CatRepository,
  ) {}

  async execute(input: CreateAdoptionInput) {
    const catRecord = await this.catRepository.findCatById(input.catId);

    if (!catRecord) {
      throw new ApplicationError('not_found', `Cat with id "${input.catId}" not found`);
    }

    if (catRecord.status !== CatStatus.AVAILABLE) {
      throw new ApplicationError('bad_request', `Cat "${catRecord.name}" is not available for adoption`);
    }

    return this.adoptionRepository.createAdoption(input);
  }
}
