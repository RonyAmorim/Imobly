export interface CepResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location?: {
    type: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
}

export const fetchAddressByCep = async (cep: string): Promise<CepResponse | null> => {
  try {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      return null;
    }

    const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`);
    
    if (!response.ok) {
      throw new Error('CEP não encontrado');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    throw error;
  }
};
