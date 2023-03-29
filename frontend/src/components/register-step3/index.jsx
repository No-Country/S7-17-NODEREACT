import LogoTitle from "../logo-title";
import styles from "../register-step3/styles.module.css";

const RegisterStep3 = () => {
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

export default RegisterStep3;
