import { CatRecord } from '../../domain/cats/cat.types';
import { PaginatedResponse } from '../common/paginated-response';
import { CatFilters, CatRepository } from './cat-repository';

export class ListCatsUseCase {
  constructor(private readonly catRepository: CatRepository) {}

  execute(filters: CatFilters): Promise<PaginatedResponse<CatRecord>> {
    return this.catRepository.listCats(filters);
  }
}
