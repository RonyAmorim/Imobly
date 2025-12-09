import { Property } from '../../entities/Property';
import { IPropertyRepository } from '../../repositories/IPropertyRepository';

export class CreatePropertyUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(
    property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Property> {
    this.validateProperty(property);
    return await this.propertyRepository.create(property);
  }

  private validateProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): void {
    if (!property.name || property.name.trim().length === 0) {
      throw new Error('Nome do empreendimento é obrigatório');
    }

    if (!property.description || property.description.trim().length === 0) {
      throw new Error('Descrição é obrigatória');
    }

    if (property.price <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    if (!property.cnpj || property.cnpj.length < 14) {
      throw new Error('CNPJ inválido');
    }
  }
}
