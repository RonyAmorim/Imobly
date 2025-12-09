import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@presentation/navigation/types';
import { PropertyForm } from '@presentation/components/property';
import { AppHeader } from '@presentation/components/common';
import { usePropertyContext } from '@presentation/contexts/PropertyContext';
import { Property } from '@domain/entities/Property';
import { styles } from './styles';

type CreatePropertyScreenProps = NativeStackScreenProps<AdminStackParamList, 'CreateProperty'>;

export const CreatePropertyScreen: React.FC<CreatePropertyScreenProps> = ({
  navigation,
}) => {
  const { createProperty, isLoading, error } = usePropertyContext();

  const handleCreateProperty = useCallback(
    async (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
      await createProperty(property);
      navigation.goBack();
    },
    [createProperty, navigation]
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Novo Imóvel" onBack={() => navigation.goBack()} />

      <PropertyForm
        onSubmit={handleCreateProperty}
        isLoading={isLoading}
        initialError={error ?? undefined}
      />
    </SafeAreaView>
  );
};