import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientHomeScreen } from '../../screens/client/ClientHomeScreen';
import { PropertyDetailsScreen } from '../../screens/client/PropertyDetailsScreen';
import { ProfileScreen } from '../../screens/client/ProfileScreen';

const Stack = createNativeStackNavigator();

export const ClientStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="ClientHome" component={ClientHomeScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
