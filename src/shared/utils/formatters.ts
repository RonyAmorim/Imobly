export const formatCNPJ = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
  return match ? `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}` : cleaned;
};

export const unformatCNPJ = (value: string): string => value.replace(/\D/g, '');

export const formatCEP = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{5})(\d{3})$/);
  return match ? `${match[1]}-${match[2]}` : cleaned;
};

export const unformatCEP = (value: string): string => value.replace(/\D/g, '');

export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const parsePrice = (value: string): number => {
  const cleaned = value.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-BR');
};

export const formatDateTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString('pt-BR');
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
