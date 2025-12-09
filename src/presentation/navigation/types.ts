import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AdminStackParamList = {
  AdminHome: undefined;
  PropertyList: undefined;
  CreateProperty: undefined;
  EditProperty: { propertyId: string };
};

export type ClientStackParamList = {
  ClientHome: undefined;
  Profile: undefined;
  PropertyDetails: { propertyId: string };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Admin: NavigatorScreenParams<AdminStackParamList>;
  Client: NavigatorScreenParams<ClientStackParamList>;
};
