import { Property } from '../../entities/Property';
import { IPropertyRepository } from '../../repositories/IPropertyRepository';

export class UpdatePropertyUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(id: string, property: Partial<Property>): Promise<Property> {
    if (!id) {
      throw new Error('ID do imóvel é obrigatório');
    }

    const existing = await this.propertyRepository.getById(id);
    if (!existing) {
      throw new Error('Imóvel não encontrado');
    }

    return await this.propertyRepository.update(id, property);
  }
}
