import { Property } from '../../entities/Property';
import { IPropertyRepository } from '../../repositories/IPropertyRepository';

export class GetPropertyByIdUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(id: string): Promise<Property | null> {
    if (!id) {
      throw new Error('ID do imóvel é obrigatório');
    }
    return await this.propertyRepository.getById(id);
  }
}
