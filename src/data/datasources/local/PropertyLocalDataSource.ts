import { Property } from '@domain/entities/Property';
import { DatabaseHelper } from './DatabaseHelper';

interface PropertyRow {
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

export class PropertyLocalDataSource {
  async getAll(): Promise<Property[]> {
    const db = DatabaseHelper.getDB();
    const result = await db.getAllAsync<PropertyRow>('SELECT * FROM properties ORDER BY createdAt DESC');
    
    return result.map(this.mapToProperty);
  }

  async getById(id: string): Promise<Property | null> {
    const db = DatabaseHelper.getDB();
    const result = await db.getAllAsync<PropertyRow>('SELECT * FROM properties WHERE id = ?', [id]);
    
    if (result.length === 0) return null;
    return this.mapToProperty(result[0]);
  }

  async create(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const db = DatabaseHelper.getDB();
    
    const newProperty: Property = {
      ...property,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.runAsync(
      `INSERT INTO properties (id, name, address, cnpj, description, price, imageUrl, createdAt, updatedAt, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newProperty.id,
        newProperty.name,
        JSON.stringify(newProperty.address),
        newProperty.cnpj,
        newProperty.description,
        newProperty.price,
        newProperty.imageUrl,
        newProperty.createdAt.toISOString(),
        newProperty.updatedAt.toISOString(),
        newProperty.createdBy,
      ]
    );

    return newProperty;
  }

  async update(id: string, updates: Partial<Property>): Promise<Property> {
    const db = DatabaseHelper.getDB();
    const current = await this.getById(id);

    if (!current) {
      throw new Error('Imóvel não encontrado');
    }

    const updatedProperty: Property = {
      ...current,
      ...updates,
      updatedAt: new Date(),
    };

    const fields = [];
    const values = [];

    if (updates.name) { fields.push('name = ?'); values.push(updates.name); }
    if (updates.address) { fields.push('address = ?'); values.push(JSON.stringify(updates.address)); }
    if (updates.cnpj) { fields.push('cnpj = ?'); values.push(updates.cnpj); }
    if (updates.description) { fields.push('description = ?'); values.push(updates.description); }
    if (updates.price) { fields.push('price = ?'); values.push(updates.price); }
    if (updates.imageUrl) { fields.push('imageUrl = ?'); values.push(updates.imageUrl); }
    
    fields.push('updatedAt = ?'); values.push(updatedProperty.updatedAt.toISOString());
    values.push(id);

    await db.runAsync(
      `UPDATE properties SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return updatedProperty;
  }

  async delete(id: string): Promise<void> {
    const db = DatabaseHelper.getDB();
    await db.runAsync('DELETE FROM properties WHERE id = ?', [id]);
  }

  private mapToProperty(row: PropertyRow): Property {
    return {
      ...row,
      address: JSON.parse(row.address),
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }
}

