import { Property } from '../entities/Property';

export interface IPropertyRepository {
  getAll(): Promise<Property[]>;
  getById(id: string): Promise<Property | null>;
  create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property>;
  update(id: string, property: Partial<Property>): Promise<Property>;
  delete(id: string): Promise<void>;
}
