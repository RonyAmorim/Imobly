import React, { useState, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Input, Button, ErrorMessage } from '../../common';
import { Property, Address } from '@domain/entities/Property';
import {
  validateCNPJ,
  validateCEP,
  validateLatitude,
  validateLongitude,
  validatePrice,
} from '@shared/utils/validators';
import { formatCNPJ, formatCEP } from '@shared/utils/formatters';
import { fetchAddressByCep } from '@data/services/CepService';
import { useNotification } from '@presentation/contexts/Notification';
import { styles } from './styles';

interface PropertyFormProps {
  onSubmit: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  isLoading?: boolean;
  initialError?: string;
  initialData?: Property;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  onSubmit,
  isLoading = false,
  initialError,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [cnpj, setCnpj] = useState(initialData?.cnpj || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price.toString() || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  const [address, setAddress] = useState<Address>(
    initialData?.address || {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: 'SP',
      zipCode: '',
      latitude: 0,
      longitude: 0,
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState(initialError || '');

  const { showNotification } = useNotification();
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleCepChange = useCallback(async (text: string) => {
    const formatted = formatCEP(text);
    setAddress((prev) => ({ ...prev, zipCode: formatted }));

    const cleanCep = formatted.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      try {
        const data = await fetchAddressByCep(cleanCep);
        if (data) {
          setAddress((prev) => ({
            ...prev,
            zipCode: formatted,
            street: data.street || prev.street,
            neighborhood: data.neighborhood || prev.neighborhood,
            city: data.city || prev.city,
            state: data.state || prev.state,
            latitude: data.location?.coordinates.latitude
              ? parseFloat(data.location.coordinates.latitude)
              : prev.latitude,
            longitude: data.location?.coordinates.longitude
              ? parseFloat(data.location.coordinates.longitude)
              : prev.longitude,
          }));
          showNotification('Endereço encontrado!', 'success');
        }
      } catch {
        // Fail silently or show error only if user explicitly stopped typing? 
        // For now, showing error is safer for feedback.
        showNotification('CEP não encontrado ou erro na busca.', 'error');
      } finally {
        setIsLoadingCep(false);
      }
    }
  }, [showNotification]);

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (!description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!price) {
      newErrors.price = 'Preço é obrigatório';
    } else if (!validatePrice(parseFloat(price))) {
      newErrors.price = 'Preço deve ser maior que zero';
    }

    if (!address.street.trim()) {
      newErrors.street = 'Rua é obrigatória';
    }

    if (!address.number.trim()) {
      newErrors.number = 'Número é obrigatório';
    }

    if (!address.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }

    if (!address.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!address.zipCode.trim()) {
      newErrors.zipCode = 'CEP é obrigatório';
    } else if (!validateCEP(address.zipCode)) {
      newErrors.zipCode = 'CEP inválido';
    }

    if (!validateLatitude(address.latitude)) {
      newErrors.latitude = 'Latitude inválida (-90 a 90)';
    }

    if (!validateLongitude(address.longitude)) {
      newErrors.longitude = 'Longitude inválida (-180 a 180)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, cnpj, description, price, address]);

  const handleSubmit = useCallback(async () => {
    setSubmitError('');

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        name,
        cnpj,
        description,
        price: parseFloat(price),
        imageUrl,
        address,
        createdBy: 'user_id',
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erro ao salvar propriedade');
    }
  }, [name, cnpj, description, price, imageUrl, address, validateForm, onSubmit]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {submitError && (
        <ErrorMessage message={submitError} onDismiss={() => setSubmitError('')} />
      )}

      <Text variant="labelLarge" style={styles.sectionTitle}>
        Informações Gerais
      </Text>

      <Input
        label="Nome do Imóvel"
        placeholder="ex: Apartamento 2 quartos"
        value={name}
        onChangeText={setName}
        error={errors.name}
        editable={!isLoading}
      />

      <Input
        label="CNPJ"
        placeholder="00.000.000/0000-00"
        value={cnpj}
        onChangeText={(text) => setCnpj(formatCNPJ(text))}
        error={errors.cnpj}
        editable={!isLoading}
      />

      <Input
        label="Descrição"
        placeholder="Descreva o imóvel"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        error={errors.description}
        editable={!isLoading}
      />

      <Input
        label="Preço"
        placeholder="0.00"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        error={errors.price}
        editable={!isLoading}
      />

      <Input
        label="URL da Imagem"
        placeholder="https://exemplo.com/imagem.jpg"
        value={imageUrl}
        onChangeText={setImageUrl}
        editable={!isLoading}
      />

      <Text variant="labelLarge" style={styles.sectionTitle}>
        Endereço
      </Text>

      <Input
        label={isLoadingCep ? "Buscando CEP..." : "CEP"}
        placeholder="00000-000"
        value={address.zipCode}
        onChangeText={handleCepChange}
        error={errors.zipCode}
        editable={!isLoading && !isLoadingCep}
        keyboardType="numeric"
        maxLength={9}
      />

      <Input
        label="Rua"
        placeholder="Nome da rua"
        value={address.street}
        onChangeText={(text) => setAddress({ ...address, street: text })}
        error={errors.street}
        editable={!isLoading}
      />

      <Input
        label="Número"
        placeholder="123"
        value={address.number}
        onChangeText={(text) => setAddress({ ...address, number: text })}
        error={errors.number}
        editable={!isLoading}
      />

      <Input
        label="Complemento (opcional)"
        placeholder="Apto 101"
        value={address.complement}
        onChangeText={(text) => setAddress({ ...address, complement: text })}
        editable={!isLoading}
      />

      <Input
        label="Bairro"
        placeholder="Nome do bairro"
        value={address.neighborhood}
        onChangeText={(text) => setAddress({ ...address, neighborhood: text })}
        error={errors.neighborhood}
        editable={!isLoading}
      />

      <Input
        label="Cidade"
        placeholder="São Paulo"
        value={address.city}
        onChangeText={(text) => setAddress({ ...address, city: text })}
        error={errors.city}
        editable={!isLoading}
      />

      <Text variant="labelLarge" style={styles.sectionTitle}>
        Localização
      </Text>

      <Input
        label="Latitude"
        placeholder="-23.5505"
        value={address.latitude.toString()}
        onChangeText={(text) =>
          setAddress({ ...address, latitude: parseFloat(text) || 0 })
        }
        keyboardType="decimal-pad"
        error={errors.latitude}
        editable={!isLoading}
      />

      <Input
        label="Longitude"
        placeholder="-46.6333"
        value={address.longitude.toString()}
        onChangeText={(text) =>
          setAddress({ ...address, longitude: parseFloat(text) || 0 })
        }
        keyboardType="decimal-pad"
        error={errors.longitude}
        editable={!isLoading}
      />

      <Button
        title={initialData ? 'Atualizar Imóvel' : 'Criar Imóvel'}
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};