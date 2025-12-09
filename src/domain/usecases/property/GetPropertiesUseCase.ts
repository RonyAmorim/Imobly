import { Property } from '../../entities/Property';
import { IPropertyRepository } from '../../repositories/IPropertyRepository';

export class GetPropertiesUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(): Promise<Property[]> {
    return await this.propertyRepository.getAll();
  }
}
