import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Divider } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@presentation/navigation/types';
import { LoadingSpinner, AppHeader } from '@presentation/components/common';
import { usePropertyContext } from '@presentation/contexts/PropertyContext';
import { Property } from '@domain/entities/Property';
import { formatPrice } from '@shared/utils/formatters';
import { styles } from './styles';

type PropertyDetailsScreenProps = NativeStackScreenProps<ClientStackParamList, 'PropertyDetails'>;

export const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { propertyId } = route.params;
  const { getPropertyById } = usePropertyContext();
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <AppHeader title="Detalhes" onBack={() => navigation.goBack()} />
        <LoadingSpinner visible message="Carregando..." />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <AppHeader title="Detalhes" onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Imóvel não encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Detalhes" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!!property.imageUrl && (
          <Image
            source={{ uri: property.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.section}>
          <Text variant="displaySmall" style={styles.title}>
            {property.name}
          </Text>

          <Text variant="headlineSmall" style={styles.price}>
            {formatPrice(property.price)}
          </Text>
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.sectionTitle}>
            Descrição
          </Text>
          <Text variant="bodyMedium" style={styles.sectionContent}>
            {property.description}
          </Text>
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.sectionTitle}>
            Endereço
          </Text>
          <View style={styles.infoRow}>
            <Text variant="labelMedium" style={styles.infoLabel}>
              Rua:
            </Text>
            <Text variant="bodyMedium" style={styles.infoValue}>
              {property.address.street}, {property.address.number}
            </Text>
          </View>

          {property.address.complement && (
            <View style={styles.infoRow}>
              <Text variant="labelMedium" style={styles.infoLabel}>
                Complemento:
              </Text>
              <Text variant="bodyMedium" style={styles.infoValue}>
                {property.address.complement}
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text variant="labelMedium" style={styles.infoLabel}>
              Bairro:
            </Text>
            <Text variant="bodyMedium" style={styles.infoValue}>
              {property.address.neighborhood}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="labelMedium" style={styles.infoLabel}>
              Cidade:
            </Text>
            <Text variant="bodyMedium" style={styles.infoValue}>
              {property.address.city} - {property.address.state}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text variant="labelMedium" style={styles.infoLabel}>
              CEP:
            </Text>
            <Text variant="bodyMedium" style={styles.infoValue}>
              {property.address.zipCode}
            </Text>
          </View>
        </View>



        <Divider />

        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.sectionTitle}>
            Informações
          </Text>
          <View style={styles.infoRow}>
            <Text variant="labelMedium" style={styles.infoLabel}>
              CNPJ:
            </Text>
            <Text variant="bodyMedium" style={styles.infoValue}>
              {property.cnpj}
            </Text>
          </View>
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="labelLarge" style={styles.sectionTitle}>
            Localização no Mapa
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: property.address.latitude,
                longitude: property.address.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: property.address.latitude,
                  longitude: property.address.longitude,
                }}
                title={property.name}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};