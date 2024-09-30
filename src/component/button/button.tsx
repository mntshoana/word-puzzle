import css from "./button.module.css";
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled: boolean;
  className?: string;
}

const ButtonComponent = (props: ButtonProps) => {
  return (
    <button
      className={
        `${css.button} ` +
        `${props.className ?? ""}`
      }
      disabled={props?.disabled ?? false}
      onClick={() => props?.onClick()}
    >
      {props?.label}
    </button>
  );
};

export default ButtonComponent;
