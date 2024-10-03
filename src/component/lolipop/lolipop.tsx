import { useState } from "react";
import css from "./lolipop.module.css";
interface LolipopProps {
  max: number;
  value: number;
  className?: string;
}

const LolipopComponent = (props: LolipopProps) => {
  const [value, setValue] = useState(props.value ?? 50);
  const percent = (value / props.max) * 100;
  const margin = Math.max(0.5, percent);

  const getHeatMapColor = (percent: number) => {
    let r, g, b;
    if (percent < 50) {
      r = Math.floor(70 * (percent / 50));
      g = Math.floor(40 * (percent / 50));
      b = 180;
    } else {
      r = 255;
      g = Math.floor(70 * ((100 - percent) / 50));
      b = Math.floor(30 * ((100 - percent) / 50));
    }
    return `rgba(${r},${g},${b},0.5)`;
  };

  const heatMapColor = getHeatMapColor(percent);
  return (
    <div className={css.lollipop_container}>
      <div className={css.lollipop_item}>
        <div
          className={css.line}
          style={{
            width: `${margin}%`,
            backgroundColor: getHeatMapColor(percent),
          }}
        ></div>
        <div className={css.circle} style={{ left: `${margin}%` }}>
          <span className={css.label}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default LolipopComponent;
