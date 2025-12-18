import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { Snackbar, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationContextData {
  showNotification: (message: string, type?: NotificationType) => void;
  showError: (error: unknown) => void;
}

const NotificationContext = createContext<NotificationContextData | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const insets = useSafeAreaInsets();

  const showNotification = useCallback((msg: string, notificationType: NotificationType = 'info') => {
    setMessage(msg);
    setType(notificationType);
    setVisible(true);
  }, []);

  const showError = useCallback((error: unknown) => {
    let msg = 'Ocorreu um erro inesperado.';
    if (error instanceof Error) {
      msg = error.message;
    } else if (typeof error === 'string') {
      msg = error;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      msg = String((error as { message: unknown }).message);
    } else if (typeof error === 'object') {
       try {
         msg = JSON.stringify(error);
       } catch {
         msg = 'Erro desconhecido';
       }
    }
    showNotification(msg, 'error');
  }, [showNotification]);

  const onDismiss = () => setVisible(false);

  const value = useMemo(() => ({ showNotification, showError }), [showNotification, showError]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={onDismiss}
          duration={3000}
          style={[
            styles.snackbar,
            type === 'error' && styles.error,
            type === 'success' && styles.success,
          ]}
          wrapperStyle={[styles.wrapper, { top: insets.top + 10 }]}
        >
          {message}
        </Snackbar>
      </Portal>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};