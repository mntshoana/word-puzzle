import { useNavigate } from "react-router-dom";
import ButtonComponent from "src/component/button/button";
import css from "./random-sequence.module.css";

const AppRandomSequenceComponent = () => {
  const reroute = useNavigate();

  return (
    <>
      <div className={css.container}>
        <span>Random sequence</span>
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

export default AppRandomSequenceComponent;
