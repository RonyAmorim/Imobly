import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Edit, Trash2 } from 'lucide-react-native';
import { Property } from '@domain/entities/Property';
import { formatPrice } from '@shared/utils/formatters';
import { colors } from '@shared/theme/colors';
import { styles } from './styles';

interface PropertyCardProps {
  property: Property;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={!onPress}>
      <Card style={styles.card}>
        {!!property.imageUrl && (
          <Card.Cover
            source={{ uri: property.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <Card.Content style={styles.content}>
          <Text variant="titleMedium" style={styles.name} numberOfLines={1}>
            {property.name}
          </Text>

          <Text variant="bodySmall" style={styles.address} numberOfLines={1}>
            {property.address.street}, {property.address.number}
            {property.address.complement && ` - ${property.address.complement}`}
          </Text>

          <Text variant="labelMedium" style={styles.location} numberOfLines={1}>
            {property.address.neighborhood}, {property.address.city} - {property.address.state}
          </Text>

          <View style={styles.infoRow}>
            <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
              {property.description}
            </Text>
          </View>

          <View style={styles.footer}>
            <Text variant="headlineSmall" style={styles.price} numberOfLines={1}>
              {formatPrice(property.price)}
            </Text>

            {showActions && (onEdit || onDelete) && (
              <View style={styles.actions}>
                {onEdit && (
                  <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
                    <Edit size={24} color={colors.primary} />
                  </TouchableOpacity>
                )}
                {onDelete && (
                  <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
                    <Trash2 size={24} color={colors.error} />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};