import { IPropertyRepository } from '../../repositories/IPropertyRepository';

export class DeletePropertyUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('ID do imóvel é obrigatório');
    }

    const existing = await this.propertyRepository.getById(id);
    if (!existing) {
      throw new Error('Imóvel não encontrado');
    }

    await this.propertyRepository.delete(id);
  }
}
