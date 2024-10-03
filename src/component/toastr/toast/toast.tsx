import css from "./toast.module.css";
interface ToastProps {
  message: string;
  type: string;
}

const Toast = (props: ToastProps) => (
  <div className={`${css.toast} ${css[props.type]}`}>{props.message}</div>
);

export default Toast;
