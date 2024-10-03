import css from "./spinner.module.css";

const SpinnerComponent = () => {
  return (
    <main className={css.main}>
      <div className={css.spinner_container}>
        <img className={css.spinner} alt="spinner" />
        <p className={css.spinner_text}>Loading...</p>
      </div>
    </main>
  );
};

export default SpinnerComponent;
