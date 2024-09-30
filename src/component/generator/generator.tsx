import { useNavigate } from "react-router-dom";
import ButtonComponent from "src/component/button/button";
import css from "./generator.module.css";

const AppGeneratorComponent = () => {
  const reroute = useNavigate();

  return (
    <>
      <div className={css.container}>
        <span>Content</span>
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
