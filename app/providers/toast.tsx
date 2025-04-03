import { Toaster, ToastBar } from "react-hot-toast";

export const ToastManager = () => {
  return (
    <Toaster position="top-right" reverseOrder={false}>
      {(t) => <ToastBar toast={t} />}
    </Toaster>
  );
};
