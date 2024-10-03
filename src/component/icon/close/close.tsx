import css from "./close.module.css";

interface Props {
  size: number;
  className: string;
}

const CloseIcon = ({ size, className }: Props) => {
  return (
    <svg
      className={`${css.icon} ${className}`}
      viewBox="0 0 1216 1312"
      style={{ width: size + "px", height: size + "px" }}
    >
      <path
        fill="currentColor"
        d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"
      ></path>
    </svg>
  );
};

export default CloseIcon;
