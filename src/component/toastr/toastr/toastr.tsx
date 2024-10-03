import css from "./toastr.module.css";

import Toast from "../toast/toast";

const Toastr = ({ toasts }) => {
  if (toasts.length === 0) return <></>;
  return (
    <div className={css.toaster}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};
export default Toastr;
