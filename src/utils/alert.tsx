import { toast } from "react-toastify";
toast.configure();

export const errorFunction = (errorMessage: string) => {
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const successFunction = (successMessage: string) => {
  toast.info(successMessage, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
