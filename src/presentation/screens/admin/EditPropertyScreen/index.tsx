import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@presentation/navigation/types';
import { PropertyForm } from '@presentation/components/property';
import { LoadingSpinner, AppHeader } from '@presentation/components/common';
import { usePropertyContext } from '@presentation/contexts/PropertyContext';
import { Property } from '@domain/entities/Property';
import { styles } from './styles';

type EditPropertyScreenProps = NativeStackScreenProps<AdminStackParamList, 'EditProperty'>;

export const EditPropertyScreen: React.FC<EditPropertyScreenProps> = ({
  navigation,
  route,
}) => {
  const { propertyId } = route.params;
  const { updateProperty, isLoading, error, getPropertyById } =
    usePropertyContext();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const loadedProperty = await getPropertyById(propertyId);
        setProperty(loadedProperty);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [propertyId, getPropertyById]);

  const handleUpdateProperty = useCallback(
    async (updatedProperty: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
      await updateProperty(propertyId, {
        ...updatedProperty,
        id: propertyId,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Property);
      navigation.goBack();
    },
    [propertyId, updateProperty, navigation]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <AppHeader title="Editar Imóvel" onBack={() => navigation.goBack()} />
        <LoadingSpinner visible message="Carregando imóvel..." />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <AppHeader title="Editar Imóvel" onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <LoadingSpinner visible={false} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Editar Imóvel" onBack={() => navigation.goBack()} />

      <PropertyForm
        onSubmit={handleUpdateProperty}
        isLoading={isLoading}
        initialError={error ?? undefined}
        initialData={property}
      />

      <LoadingSpinner visible={isLoading} message="Atualizando imóvel..." />
    </SafeAreaView>
  );
};