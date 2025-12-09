import * as SQLite from 'expo-sqlite';
import { Property } from '@domain/entities/Property';

const db = SQLite.openDatabaseSync('imobly.db');

export const DatabaseHelper = {
  init: async (): Promise<void> => {
    try {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS properties (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          address TEXT NOT NULL,
          cnpj TEXT NOT NULL,
          description TEXT NOT NULL,
          price REAL NOT NULL,
          imageUrl TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          createdBy TEXT NOT NULL
        );
      `);
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  },

  seed: async (): Promise<void> => {
    try {
      const result = await db.getAllAsync<{ count: number }>('SELECT count(*) as count FROM properties');
      const count = result[0]?.count || 0;

      if (count === 0) {
        const initialProperties: Property[] = [
          {
            id: '1',
            name: 'Apartamento Luxuoso no Centro',
            address: {
              street: 'Av. Paulista',
              number: '1000',
              neighborhood: 'Bela Vista',
              city: 'São Paulo',
              state: 'SP',
              zipCode: '01310-100',
              latitude: -23.5615,
              longitude: -46.6560,
            },
            cnpj: '12.345.678/0001-90',
            description: 'Lindo apartamento com vista para a cidade.',
            price: 1500000,
            imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'admin',
          },
          {
            id: '2',
            name: 'Casa Confortável no Subúrbio',
            address: {
              street: 'Rua das Flores',
              number: '123',
              neighborhood: 'Jardim das Rosas',
              city: 'Campinas',
              state: 'SP',
              zipCode: '13000-000',
              latitude: -22.9099,
              longitude: -47.0626,
            },
            cnpj: '98.765.432/0001-10',
            description: 'Casa espaçosa com jardim e piscina.',
            price: 850000,
            imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            createdAt: new Date(),
            updatedAt: new Date(),
            createdBy: 'admin',
          },
        ];

        for (const prop of initialProperties) {
          await db.runAsync(
            `INSERT OR IGNORE INTO properties (id, name, address, cnpj, description, price, imageUrl, createdAt, updatedAt, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              prop.id,
              prop.name,
              JSON.stringify(prop.address),
              prop.cnpj,
              prop.description,
              prop.price,
              prop.imageUrl,
              prop.createdAt.toISOString(),
              prop.updatedAt.toISOString(),
              prop.createdBy,
            ]
          );
        }
      }
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    }
  },

  getDB: () => db,
};
