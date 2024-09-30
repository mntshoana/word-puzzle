import { useNavigate } from "react-router-dom";
import ButtonComponent from "src/component/button/button";
import NumberInputComponent from "../input/number/number";
import SliderComponent from "../slider/slider";
import css from "./generator.module.css";

const AppGeneratorComponent = () => {
  const reroute = useNavigate();

  return (
    <>
      <div className={css.container}>
        <h2>Word count</h2>
        <NumberInputComponent
          className={css.word_count_input}
          value={1}
          onChange={(val) => console.log("value changed")}
        />
        <h2>Min length</h2>
        <SliderComponent
          className={css.slider}
          min="1"
          max="100"
          label="Valuee"
          value="4"
          disabled={false}
          valueChange={(_) => console.log("Slider changed")}
        />
      </div>

      <ButtonComponent
        className={css.button}
        label="Generate"
        disabled={false}
        onClick={() => console.log("clicked")}
      />
    </>
  );
};

export default AppGeneratorComponent;
