import { useState } from 'react';

interface UseAlertReturn {
  showAlert: boolean;
  alertMessage: string;
  alertType: 'success' | 'error' | 'warning' | 'info';
  showTemporaryAlert: (message: string, type?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  hideAlert: () => void;
}

export const useAlert = (): UseAlertReturn => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('error');

  const showTemporaryAlert = (
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info' = 'error', 
    duration: number = 5000
  ) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), duration);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  return {
    showAlert,
    alertMessage,
    alertType,
    showTemporaryAlert,
    hideAlert,
  };
};