import React, { useCallback, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@presentation/navigation/types';
import { PropertyCard } from '@presentation/components/property';
import { EmptyState, LoadingSpinner, AppHeader } from '@presentation/components/common';
import { usePropertyContext } from '@presentation/contexts/PropertyContext';
import { styles } from './styles';

type ClientHomeScreenProps = NativeStackScreenProps<ClientStackParamList, 'ClientHome'>;

export const ClientHomeScreen: React.FC<ClientHomeScreenProps> = ({ navigation }) => {
  const { properties, isLoading, loadProperties } = usePropertyContext();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadProperties();
    } finally {
      setRefreshing(false);
    }
  }, [loadProperties]);

  const handlePropertyPress = useCallback(
    (propertyId: string) => {
      navigation.navigate('PropertyDetails', { propertyId });
    },
    [navigation]
  );

  const handleProfilePress = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Imóveis Disponíveis">
        <Appbar.Action icon="account" onPress={handleProfilePress} color="white" />
      </AppHeader>

      <View style={styles.content}>
        {properties.length === 0 && !isLoading ? (
          <EmptyState
            title="Nenhum imóvel disponível"
            description="Volte mais tarde para descobrir novos imóveis"
          />
        ) : (
          <FlatList
            data={properties}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PropertyCard
                property={item}
                onPress={() => handlePropertyPress(item.id)}
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

      <LoadingSpinner visible={isLoading && properties.length === 0} message="Carregando imóveis..." />
    </SafeAreaView>
  );
};