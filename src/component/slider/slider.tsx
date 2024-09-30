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

  const handleChange = (event: any) => {
    setValue(event.target.value);
    props.valueChange(event.target.value);
  };

  return (
    <div className={`${css.slider_container} ${props.className}`}>
      <label className={css.min_value}>{props.min}</label>
      <input
        className={css.slider}
        type="range"
        min={props.min ?? 0}
        max={props.max ?? 100}
        value={value}
        onChange={handleChange}
      />
      <label className={css.max_value}>{props.max}</label>
      <div className={css.slider_label}>
        <label>
          {props.label}: {value}
        </label>
      </div>
    </div>
  );
};

export default SliderComponent;
