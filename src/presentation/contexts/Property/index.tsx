import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Property } from '@domain/entities/Property';
import { DatabaseHelper } from '@data/datasources/local/DatabaseHelper';
import { PropertyLocalDataSource } from '@data/datasources/local/PropertyLocalDataSource';
import { PropertyRepository } from '@data/repositories/PropertyRepository';
import { GetPropertiesUseCase } from '@domain/usecases/property/GetPropertiesUseCase';
import { GetPropertyByIdUseCase } from '@domain/usecases/property/GetPropertyByIdUseCase';
import { CreatePropertyUseCase } from '@domain/usecases/property/CreatePropertyUseCase';
import { UpdatePropertyUseCase } from '@domain/usecases/property/UpdatePropertyUseCase';
import { DeletePropertyUseCase } from '@domain/usecases/property/DeletePropertyUseCase';
import { useProperty } from '../../hooks/useProperty';
import { useAuthContext } from '../Auth';

interface PropertyContextData {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  loadProperties: () => Promise<void>;
  getPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  clearError: () => void;
}

const PropertyContext = createContext<PropertyContextData | undefined>(undefined);

interface PropertyProviderProps {
  children: ReactNode;
}

const propertyDataSource = new PropertyLocalDataSource();
const propertyRepository = new PropertyRepository(propertyDataSource);
const getPropertiesUseCase = new GetPropertiesUseCase(propertyRepository);
const getPropertyByIdUseCase = new GetPropertyByIdUseCase(propertyRepository);
const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository);
const updatePropertyUseCase = new UpdatePropertyUseCase(propertyRepository);
const deletePropertyUseCase = new DeletePropertyUseCase(propertyRepository);

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const authContext = useAuthContext();
  const [isDbReady, setIsDbReady] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  
  const propertyHook = useProperty(
    getPropertiesUseCase,
    getPropertyByIdUseCase,
    createPropertyUseCase,
    updatePropertyUseCase,
    deletePropertyUseCase,
  );

  // Initialize DB once on mount
  useEffect(() => {
    const initDb = async () => {
      try {
        await DatabaseHelper.init();
        await DatabaseHelper.seed();
        setIsDbReady(true);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    initDb();
  }, []);

  // Reset loaded state on logout
  useEffect(() => {
    if (!authContext.user) {
      setHasLoaded(false);
    }
  }, [authContext.user]);

  // Load properties only when DB is ready, user is logged in, and haven't loaded yet
  useEffect(() => {
    if (isDbReady && authContext.user && !hasLoaded) {
      propertyHook.loadProperties().finally(() => {
        setHasLoaded(true);
      });
    }
  }, [isDbReady, authContext.user, hasLoaded, propertyHook]);

  const value: PropertyContextData = {
    properties: propertyHook.properties,
    isLoading: propertyHook.isLoading,
    error: propertyHook.error,
    loadProperties: propertyHook.loadProperties,
    getPropertyById: propertyHook.getPropertyById,
    createProperty: propertyHook.createProperty,
    updateProperty: propertyHook.updateProperty,
    deleteProperty: propertyHook.deleteProperty,
    clearError: propertyHook.clearError,
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};

export const usePropertyContext = (): PropertyContextData => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within PropertyProvider');
  }
  return context;
};
