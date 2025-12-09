import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@presentation/navigation/types';
import { Button } from '@presentation/components/common';
import { styles } from './styles';

type WelcomeScreenProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text variant="displayMedium" style={styles.logo}>
            Imobly
          </Text>
        </View>

        <Text variant="headlineSmall" style={styles.title}>
          Descubra o imóvel dos seus sonhos
        </Text>

        <Text variant="bodyLarge" style={styles.description}>
          Explore os melhores imóveis disponíveis no mercado e encontre seu novo lar
        </Text>
      </View>

      <View style={styles.buttons}>
        <Button title="Entrar" onPress={handleLogin} fullWidth style={styles.button} />
        <Button
          title="Criar Conta"
          onPress={handleRegister}
          variant="outlined"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};