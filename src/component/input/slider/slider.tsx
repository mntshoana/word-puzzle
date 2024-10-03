import { useState } from "react";
import css from "./slider.module.css";

interface SliderProps {
  min: number;
  max: number;
  label: string;
  value: number;
  disabled: boolean;
  valueChange: (value: number) => void;
  className?: string;
}

const SliderComponent = (props: SliderProps) => {
  const [value, setValue] = useState(props.value ?? 50);

  const handleChange = (val: any) => {
    setValue(Number(val));
    props.valueChange(Number(val));
  };

  return (
    <div className={`${css.slider_container} ${props.className}`}>
      <div className={css.slider_row}>
        <label className={css.min_value}>{props.min}</label>
        <input
          className={css.slider}
          type="range"
          min={props.min ?? 0}
          max={props.max ?? 100}
          value={value}
          onChange={(event$) => handleChange(event$.target.value)}
        />
        <label className={css.max_value}>{props.max}</label>
      </div>
      <div className={css.slider_label}>
        <label>
          {props.label}: <span className={css.label_digit}>{value}</span>
        </label>
      </div>
    </div>
  );
};

export default SliderComponent;
