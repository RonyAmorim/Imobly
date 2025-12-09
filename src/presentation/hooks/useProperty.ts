import { useState, useCallback } from 'react';
import { Property } from '@domain/entities/Property';
import { GetPropertiesUseCase } from '@domain/usecases/property/GetPropertiesUseCase';
import { GetPropertyByIdUseCase } from '@domain/usecases/property/GetPropertyByIdUseCase';
import { CreatePropertyUseCase } from '@domain/usecases/property/CreatePropertyUseCase';
import { UpdatePropertyUseCase } from '@domain/usecases/property/UpdatePropertyUseCase';
import { DeletePropertyUseCase } from '@domain/usecases/property/DeletePropertyUseCase';

export const useProperty = (
  getPropertiesUseCase: GetPropertiesUseCase,
  getPropertyByIdUseCase: GetPropertyByIdUseCase,
  createPropertyUseCase: CreatePropertyUseCase,
  updatePropertyUseCase: UpdatePropertyUseCase,
  deletePropertyUseCase: DeletePropertyUseCase,
) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProperties = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedProperties = await getPropertiesUseCase.execute();
      setProperties(loadedProperties);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar imóveis';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [getPropertiesUseCase]);

  const getPropertyById = useCallback(
    async (id: string): Promise<Property | null> => {
      try {
        return await getPropertyByIdUseCase.execute(id);
      } catch (err: unknown) {
        console.error('Error getting property:', err);
        return null;
      }
    },
    [getPropertyByIdUseCase],
  );

  const createProperty = useCallback(
    async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setIsLoading(true);
        setError(null);
        const newProperty = await createPropertyUseCase.execute(property);
        setProperties((prev) => [...prev, newProperty]);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao criar imóvel';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [createPropertyUseCase],
  );

  const updateProperty = useCallback(
    async (id: string, property: Partial<Property>) => {
      try {
        setIsLoading(true);
        setError(null);
        const updated = await updatePropertyUseCase.execute(id, property);
        setProperties((prev) => prev.map((p) => (p.id === id ? updated : p)));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar imóvel';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [updatePropertyUseCase],
  );

  const deleteProperty = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        setError(null);
        await deletePropertyUseCase.execute(id);
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar imóvel';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [deletePropertyUseCase],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    properties,
    isLoading,
    error,
    loadProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    clearError,
  };
};
