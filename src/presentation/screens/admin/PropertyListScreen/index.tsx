import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@presentation/navigation/types';
import { PropertyCard } from '@presentation/components/property';
import { EmptyState, LoadingSpinner, ConfirmDialog, Button, AppHeader } from '@presentation/components/common';
import { usePropertyContext } from '@presentation/contexts/PropertyContext';
import { styles } from './styles';

type PropertyListScreenProps = NativeStackScreenProps<AdminStackParamList, 'PropertyList'>;

export const PropertyListScreen: React.FC<PropertyListScreenProps> = ({ navigation }) => {
  const { properties, isLoading, loadProperties, deleteProperty } = usePropertyContext();
  const [refreshing, setRefreshing] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadProperties();
    } finally {
      setRefreshing(false);
    }
  }, [loadProperties]);

  const handleCreateNew = useCallback(() => {
    navigation.navigate('CreateProperty');
  }, [navigation]);

  const handleEditProperty = useCallback(
    (propertyId: string) => {
      navigation.navigate('EditProperty', { propertyId });
    },
    [navigation]
  );

  const handleDeleteProperty = useCallback((propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setDeleteDialogVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedPropertyId) return;

    setDeleteLoading(true);
    try {
      await deleteProperty(selectedPropertyId);
    } finally {
      setDeleteLoading(false);
      setDeleteDialogVisible(false);
      setSelectedPropertyId(null);
    }
  }, [selectedPropertyId, deleteProperty]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogVisible(false);
    setSelectedPropertyId(null);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Meus Imóveis" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {properties.length === 0 && !isLoading ? (
          <EmptyState
            title="Nenhum imóvel cadastrado"
            description="Comece criando seu primeiro imóvel"
            actionText="Criar Imóvel"
            onActionPress={handleCreateNew}
          />
        ) : (
          <FlatList
            data={properties}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PropertyCard
                property={item}
                showActions
                onEdit={() => handleEditProperty(item.id)}
                onDelete={() => handleDeleteProperty(item.id)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            contentContainerStyle={styles.listContent}
            scrollEnabled={properties.length > 0}
          />
        )}
      </View>

      <LoadingSpinner visible={isLoading} message="Carregando imóveis..." />

      <View style={styles.footer}>
        <Button
          title="Novo Imóvel"
          onPress={handleCreateNew}
          fullWidth
        />
      </View>

      <ConfirmDialog
        visible={deleteDialogVisible}
        title="Deletar Imóvel"
        description="Tem certeza que deseja deletar este imóvel? Esta ação não pode ser desfeita."
        confirmText="Deletar"
        cancelText="Cancelar"
        isDangerous
        isLoading={deleteLoading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </SafeAreaView>
  );
};