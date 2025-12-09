import { Property } from '@domain/entities/Property';
import { IPropertyRepository } from '@domain/repositories/IPropertyRepository';
import { PropertyLocalDataSource } from '../datasources/local/PropertyLocalDataSource';

export class PropertyRepository implements IPropertyRepository {
  constructor(private propertyDataSource: PropertyLocalDataSource) {}

  async getAll(): Promise<Property[]> {
    return await this.propertyDataSource.getAll();
  }

  async getById(id: string): Promise<Property | null> {
    return await this.propertyDataSource.getById(id);
  }

  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    return await this.propertyDataSource.create(property);
  }

  async update(id: string, property: Partial<Property>): Promise<Property> {
    return await this.propertyDataSource.update(id, property);
  }

  async delete(id: string): Promise<void> {
    await this.propertyDataSource.delete(id);
  }
}
