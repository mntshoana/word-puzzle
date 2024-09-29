import css from "./header.module.css";

const AppHeader = () => {
  return (
    <main className={css.header}>
      <div className={css.row}>
        <a className={css.title_link} href="/">
          <h1 className={css.title}>
            <span className={css.tiny_little_t}>W</span>ord <br />{" "}
            <span className={css.tiny_little_l}>G</span>en <br />{" "}
          </h1>
        </a>
        <div className={css.generator_text_container}>
          <span className={css.generator_text}>Generator</span>
          <br />
        </div>
      </div>
    </main>
  );
};

export default AppHeader;
