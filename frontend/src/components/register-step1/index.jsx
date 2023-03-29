import styles from "../register-step1/styles.module.css";
import LogoTitle from "../logo-title";

const RegisterStep1 = () => {
  return (
    <div className={styles.container}>
      <LogoTitle />
      <p className={styles.container__title}>Registrate</p>
      <p className={styles.container__subtitle}>Éste será el nombre con otros usuarios te verán.</p>
      <form className={styles.form}>
        <div className={styles.form__container}>
          <label className={styles.form__label} htmlFor="">
            Nombre de usuario
          </label>
          <input className={styles.form__input} type="text" />
        </div>
      </form>
    </div>
  );
};

export default RegisterStep1;
