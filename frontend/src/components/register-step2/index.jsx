import LogoTitle from "../logo-title";
import styles from "../register-step2/styles.module.css";

const RegisterStep2 = () => {
  return (
    <div className={styles.container}>
      <LogoTitle />
      <p className={styles.container__title}>Registrate</p>
      <p className={styles.text}>
        Hemos enviado un código a tu correo. Colócalo aquí para continuar.
      </p>
      <form className={styles.form}>
        <div className={styles.form__container}>
          <label className={styles.form__label} htmlFor="">
            Ingresá tu código
          </label>
          <input className={styles.form__input} type="text" />
        </div>
      </form>
    </div>
  );
};

export default RegisterStep2;
