import { ApplicationError } from '../errors/application-error';
import { CatRepository } from './cat-repository';

export class DeleteCatUseCase {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(catId: string) {
    const existingCatRecord = await this.catRepository.findCatById(catId);

    if (!existingCatRecord) {
      throw new ApplicationError('not_found', `Cat with id "${catId}" not found`);
    }

    await this.catRepository.deleteCat(catId);
  }
}
