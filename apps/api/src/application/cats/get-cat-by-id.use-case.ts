import { ApplicationError } from '../errors/application-error';
import { CatRepository } from './cat-repository';

export class GetCatByIdUseCase {
  constructor(private readonly catRepository: CatRepository) {}

  async execute(catId: string) {
    const catRecord = await this.catRepository.findCatById(catId);

    if (!catRecord) {
      throw new ApplicationError('not_found', `Cat with id "${catId}" not found`);
    }

    return catRecord;
  }
}
