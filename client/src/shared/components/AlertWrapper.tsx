import { AlertMessage } from './AlertMessage';

interface AlertWrapperProps {
  showAlert: boolean;
  alertMessage: string;
  alertType: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export const AlertWrapper = ({ showAlert, alertMessage, alertType, onClose }: AlertWrapperProps) => {
  if (!showAlert) return null;

  return (
    <AlertMessage 
      type={alertType}
      message={alertMessage}
      onClose={onClose}
    />
  );
};