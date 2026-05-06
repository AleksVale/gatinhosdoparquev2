import { ApplicationError } from '../errors/application-error';
import { CatRepository, UpdateCatInput } from './cat-repository';

export class UpdateCatUseCase {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(catId: string, input: UpdateCatInput) {
    const existingCatRecord = await this.catRepository.findCatById(catId);

    if (!existingCatRecord) {
      throw new ApplicationError('not_found', `Cat with id "${catId}" not found`);
    }

    return this.catRepository.updateCat(catId, input);
  }
}
