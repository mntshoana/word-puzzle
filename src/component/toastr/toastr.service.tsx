import { createContext, useCallback, useState } from "react";
import Toastr from "./toastr/toastr";

const ToasterContext = createContext();

const ToasterProvider = ({ children }: any) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message: string, type = "info") => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  return (
    <ToasterContext.Provider value={addToast}>
      {children}
      <Toastr toasts={toasts} />
    </ToasterContext.Provider>
  );
};

export { ToasterContext, ToasterProvider };
