import type { FC } from "react";
import { useEffect, useState } from "react";

interface AlertMessageProps {
  type?: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
  onClose?: () => void;
}

const bgClasses = {
  success: "bg-green-100 border-green-300 text-green-800",
  error: "bg-red-100 border-red-300 text-red-800",
  info: "bg-blue-100 border-blue-300 text-blue-800",
  warning: "bg-yellow-100 border-yellow-300 text-yellow-800",
};

export const AlertMessage: FC<AlertMessageProps> = ({
  type = "info",
  message,
  duration = 4000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimeout = setTimeout(() => setVisible(false), duration);
    const removeTimeout = setTimeout(() => {
      onClose?.();
    }, duration + 500);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded border shadow-lg transition-opacity duration-500 ease-in-out ${
        bgClasses[type]
      } ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex justify-between items-start gap-4">
        <span className="text-sm">{message}</span>
        {onClose && (
          <button
            onClick={() => setVisible(false)}
            className="text-xl font-bold leading-none"
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
