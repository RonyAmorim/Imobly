import { Property } from '@domain/entities/Property';
import { DatabaseHelper } from './DatabaseHelper';
import { PropertyModel, PropertyMapper } from '../../models/PropertyModel';

export class PropertyLocalDataSource {
  async getAll(): Promise<Property[]> {
    const db = DatabaseHelper.getDB();
    const result = await db.getAllAsync<PropertyModel>('SELECT * FROM properties ORDER BY createdAt DESC');
    
    return result.map(PropertyMapper.toEntity);
  }

  async getById(id: string): Promise<Property | null> {
    const db = DatabaseHelper.getDB();
    const result = await db.getAllAsync<PropertyModel>('SELECT * FROM properties WHERE id = ?', [id]);
    
    if (result.length === 0) return null;
    return PropertyMapper.toEntity(result[0]);
  }

  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const db = DatabaseHelper.getDB();
    
    // Create temporary entity to generate IDs and Dates
    const tempEntity: Property = {
      ...property,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const model = PropertyMapper.fromEntity(tempEntity);

    await db.runAsync(
      `INSERT INTO properties (id, name, address, cnpj, description, price, imageUrl, createdAt, updatedAt, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        model.id,
        model.name,
        model.address,
        model.cnpj,
        model.description,
        model.price,
        model.imageUrl,
        model.createdAt,
        model.updatedAt,
        model.createdBy,
      ]
    );

    return tempEntity;
  }

  async update(id: string, updates: Partial<Property>): Promise<Property> {
    const db = DatabaseHelper.getDB();
    const current = await this.getById(id);

    if (!current) {
      throw new Error('Imóvel não encontrado');
    }

    const updatedEntity: Property = {
      ...current,
      ...updates,
      updatedAt: new Date(),
    };
    
    const model = PropertyMapper.fromEntity(updatedEntity);

    const fields = [];
    const values = [];

    // Construct query based on model to ensure correct DB format
    if (updates.name) { fields.push('name = ?'); values.push(model.name); }
    if (updates.address) { fields.push('address = ?'); values.push(model.address); }
    if (updates.cnpj) { fields.push('cnpj = ?'); values.push(model.cnpj); }
    if (updates.description) { fields.push('description = ?'); values.push(model.description); }
    if (updates.price) { fields.push('price = ?'); values.push(model.price); }
    if (updates.imageUrl) { fields.push('imageUrl = ?'); values.push(model.imageUrl); }
    
    fields.push('updatedAt = ?'); values.push(model.updatedAt);
    values.push(id);

    await db.runAsync(
      `UPDATE properties SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return updatedEntity;
  }

  async delete(id: string): Promise<void> {
    const db = DatabaseHelper.getDB();
    await db.runAsync('DELETE FROM properties WHERE id = ?', [id]);
  }
}

