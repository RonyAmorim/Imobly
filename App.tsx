import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { theme } from '@shared/theme/theme';
import { AuthProvider } from '@presentation/contexts/AuthContext';
import { PropertyProvider } from '@presentation/contexts/PropertyContext';
import { NotificationProvider } from '@presentation/contexts/NotificationContext';
import { Navigation } from '@presentation/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NotificationProvider>
          <AuthProvider>
            <PropertyProvider>
              <Navigation />
              <StatusBar style="light" backgroundColor="transparent" translucent />
            </PropertyProvider>
          </AuthProvider>
        </NotificationProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
