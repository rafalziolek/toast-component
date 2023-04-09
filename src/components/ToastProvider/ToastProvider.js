import React from "react";
import useEscapeKey from "../../hooks/useEscapeKey";
export const ToastContext = React.createContext();
function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    { variant: "notice", message: "hello bitch", id: "1" },
  ]);

  const closeToast = (id) => {
    const filteredToats = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(filteredToats);
  };
  const createToast = (variant, message) => {
    setToasts((prev) => [
      ...prev,
      { variant: variant, message: message, id: crypto.randomUUID() },
    ]);
  };

  useEscapeKey(() => {
    setToasts([]);
  });

  return (
    <ToastContext.Provider value={{ toasts, closeToast, createToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
