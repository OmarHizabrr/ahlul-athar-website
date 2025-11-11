'use client';

import {
    createContext,
    type ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

export type MessageType = "success" | "error" | "warning" | "info";
export type ConfirmType = "danger" | "warning" | "info";

interface MessageContextType {
  showMessage: (message: string, type: MessageType) => void;
  showConfirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string,
    type?: ConfirmType,
  ) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(
  undefined,
);

export function useMessage() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessage must be used within MessageProvider");
  }

  return context;
}

interface MessageProviderProps {
  children: ReactNode;
}

interface ToastMessage {
  id: string;
  message: string;
  type: MessageType;
}

interface ConfirmDialog {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText: string;
  cancelText: string;
  type: ConfirmType;
}

export function MessageProvider({ children }: MessageProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialog | null>(
    null,
  );

  const showMessage = (message: string, type: MessageType) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const showConfirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    type: ConfirmType = "info",
  ) => {
    setConfirmDialog({
      message,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      type,
    });
  };

  const handleConfirm = () => {
    if (confirmDialog) {
      confirmDialog.onConfirm();
      setConfirmDialog(null);
    }
  };

  const handleCancel = () => {
    if (confirmDialog?.onCancel) {
      confirmDialog.onCancel();
    }

    setConfirmDialog(null);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getToastColor = (type: MessageType) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  const getConfirmColor = (type: ConfirmType) => {
    switch (type) {
      case "danger":
        return "bg-red-600";
      case "warning":
        return "bg-yellow-600";
      case "info":
      default:
        return "bg-blue-600";
    }
  };

  const value = useMemo(
    () => ({
      showMessage,
      showConfirm,
    }),
    [],
  );

  return (
    <MessageContext.Provider value={value}>
      {children}

      <div className="fixed top-4 right-4 z-50 flex w-full max-w-md flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${getToastColor(toast.type)} animate-slide-in-right flex items-center gap-3 rounded-lg px-6 py-4 text-white shadow-lg`}
          >
            <div className="flex-1 text-sm font-medium">{toast.message}</div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded p-1 transition-colors hover:bg-white/20"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {confirmDialog && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="animate-scale-in w-full max-w-md rounded-xl bg-white shadow-2xl">
            <div className="border-b border-gray-100 pb-4 pt-8 text-center">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full opacity-15 ${getConfirmColor(confirmDialog.type)}`}
              >
                <span className="sr-only">icon</span>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4 text-center">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {confirmDialog.type === "danger"
                  ? "تأكيد الحذف"
                  : confirmDialog.type === "warning"
                    ? "تأكيد الإجراء"
                    : "تأكيد"}
              </h2>
              <p className="mb-4 text-gray-700">{confirmDialog.message}</p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
                >
                  {confirmDialog.cancelText}
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className={`${getConfirmColor(confirmDialog.type)} rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-200 hover:opacity-90`}
                >
                  {confirmDialog.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MessageContext.Provider>
  );
}

