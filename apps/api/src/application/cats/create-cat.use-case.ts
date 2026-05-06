import { CatRepository, CreateCatInput } from './cat-repository';

export class CreateCatUseCase {
  constructor(private readonly catRepository: CatRepository) {}

  execute(input: CreateCatInput) {
    return this.catRepository.createCat(input);
  }
}
