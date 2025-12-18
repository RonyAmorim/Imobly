import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Divider } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClientStackParamList } from '@presentation/navigation/types';
import { Button, AppHeader } from '@presentation/components/common';
import { useAuthContext } from '@presentation/contexts/Auth';
import { styles } from './styles';

type ProfileScreenProps = NativeStackScreenProps<ClientStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuthContext();

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <AppHeader title="Meu Perfil" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text variant="displayMedium" style={styles.avatarText}>
                  {user?.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>

            <Text variant="headlineSmall" style={styles.name}>
              {user?.name}
            </Text>

            <Text variant="bodyMedium" style={styles.role}>
              {user?.role === 'admin' ? 'Administrador' : 'Cliente'}
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.infoCard}>
          <Card.Content>
            <Text variant="labelLarge" style={styles.sectionTitle}>
              Informações da Conta
            </Text>

            <View style={styles.infoRow}>
              <Text variant="labelMedium" style={styles.label}>
                Email:
              </Text>
              <Text variant="bodyMedium" style={styles.value}>
                {user?.email}
              </Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <Text variant="labelMedium" style={styles.label}>
                Tipo de Conta:
              </Text>
              <Text variant="bodyMedium" style={styles.value}>
                {user?.role === 'admin' ? 'Admin' : 'Cliente'}
              </Text>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.infoRow}>
              <Text variant="labelMedium" style={styles.label}>
                Membro desde:
              </Text>
              <Text variant="bodyMedium" style={styles.value}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '—'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Button
            title="Fazer Logout"
            onPress={handleLogout}
            variant="outlined"
            fullWidth
            style={styles.logoutButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};