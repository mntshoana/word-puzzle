import { useNavigate } from "react-router-dom";
import ButtonComponent from "src/component/button/button";
import TextInputComponent from "src/component/input/text/text";
import css from "./random-sequence.module.css";

const AppRandomSequenceComponent = () => {
  const reroute = useNavigate();

  return (
    <>
      <div className={css.container}>
        <h2>See if we can solve a random sequence</h2>
        <TextInputComponent
          className={css.random_sequence_input}
          value={"blahblahblah"}
          onChange={(val) => console.log("value changed")}
        />
      </div>
      <ButtonComponent
        className={css.button}
        label="Solve"
        disabled={false}
        onClick={() => console.log("clicked")}
      />
    </>
  );
};

export default AppRandomSequenceComponent;
