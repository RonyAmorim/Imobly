import { Property, Address } from '@domain/entities/Property';

export interface PropertyModel {
  id: string;
  name: string;
  address: string;
  cnpj: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export const PropertyMapper = {
  toEntity(model: PropertyModel): Property {
    return {
      ...model,
      address: JSON.parse(model.address) as Address,
      createdAt: new Date(model.createdAt),
      updatedAt: new Date(model.updatedAt),
    };
  },

  fromEntity(entity: Property): PropertyModel {
    return {
      ...entity,
      address: JSON.stringify(entity.address),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  },
};
