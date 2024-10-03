import css from "./footer.module.css";

const AppFooter = () => {
  return (
    <footer className={css.container}>
      <div className="col-md-6">
        <p>&copy; 2024 - MN Tshoana</p>
        <p>0683189880</p>
        <p>
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
      <div className={css.col_right}>
        <p>
          <span className={css.city}> </span>Johannesburg, za
        </p>
        <p>
          <span className={css.flag}>🇿🇦</span> 100% home grown
        </p>
        <p>
          <span className={css.heart}>&#x2665;</span> Made with love
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
