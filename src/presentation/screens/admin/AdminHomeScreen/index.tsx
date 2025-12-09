import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AdminStackParamList } from '@presentation/navigation/types';
import { Button, AppHeader } from '@presentation/components/common';
import { useAuthContext } from '@presentation/contexts/AuthContext';
import { usePropertyContext } from '@presentation/contexts/PropertyContext';
import { styles } from './styles';

type AdminHomeScreenProps = NativeStackScreenProps<AdminStackParamList, 'AdminHome'>;

export const AdminHomeScreen: React.FC<AdminHomeScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuthContext();
  const { properties } = usePropertyContext();

  const handleNavigateToList = useCallback(() => {
    navigation.navigate('PropertyList');
  }, [navigation]);

  const handleNavigateToCreate = useCallback(() => {
    navigation.navigate('CreateProperty');
  }, [navigation]);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Painel Admin" />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Bem-vindo, {user?.name}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Gerencie seus imóveis
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text variant="displaySmall" style={styles.statValue}>
              {properties.length}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Imóveis Cadastrados
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text variant="displaySmall" style={styles.statValue}>
              {properties.length > 0 ? '✓' : '—'}
            </Text>
            <Text variant="bodySmall" style={styles.statLabel}>
              Status
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text variant="labelLarge" style={styles.actionsTitle}>
            Ações Rápidas
          </Text>

          <Button
            title="Meus Imóveis"
            onPress={handleNavigateToList}
            variant="contained"
            fullWidth
            style={styles.actionButton}
          />

          <Button
            title="Novo Imóvel"
            onPress={handleNavigateToCreate}
            variant="outlined"
            fullWidth
            style={styles.actionButton}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Sair"
          onPress={handleLogout}
          variant="outlined"
          fullWidth
          style={styles.logoutButton}
        />
      </View>
    </SafeAreaView>
  );
};