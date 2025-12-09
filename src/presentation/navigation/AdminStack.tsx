import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AdminHomeScreen } from '../screens/admin/AdminHomeScreen';
import { PropertyListScreen } from '../screens/admin/PropertyListScreen';
import { CreatePropertyScreen } from '../screens/admin/CreatePropertyScreen';
import { EditPropertyScreen } from '../screens/admin/EditPropertyScreen';

const Stack = createNativeStackNavigator();

export const AdminStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
      <Stack.Screen name="PropertyList" component={PropertyListScreen} />
      <Stack.Screen name="CreateProperty" component={CreatePropertyScreen} />
      <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
    </Stack.Navigator>
  );
};
