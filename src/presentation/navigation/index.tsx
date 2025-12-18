import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { UserRole } from '@domain/entities/User';
import { useAuthContext } from '../contexts/Auth';
import { AuthStack } from './stacks/AuthStack';
import { AdminStack } from './stacks/AdminStack';
import { ClientStack } from './stacks/ClientStack';
import { styles } from './styles';

export const RootNavigator: React.FC = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2C3E50" />
      </View>
    );
  }

  if (!user) {
    return <AuthStack />;
  }

  if (user.role === UserRole.ADMIN) {
    return <AdminStack />;
  }

  return <ClientStack />;
};

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};