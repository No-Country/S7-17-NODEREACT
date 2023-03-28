import Link from "next/link";
import Button from "../button";
import styles from "../login-form/styles.module.css";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <p className={styles.container__title}>Iniciar sesión</p>
      <form className={styles.form}>
        <div className={styles.form__container}>
          <label className={styles.form__label} htmlFor="">
            Ingresá tu usuario
          </label>
          <input className={styles.form__input} type="text" />
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label} htmlFor="">
            Ingresá tu contraseña
          </label>
          <input className={styles.form__input} type="text" />
        </div>
      </form>
      <div className={styles.bottom__container}>
        <p className={styles.bottom__text}>Olvidé mi contraseña</p>
        <p className={styles.bottom__text}>
          No tiene cuenta?
          <Link style={{ color: "white", fontWeight: 700 }} href="/register">
            <span> Registrate</span>
          </Link>
        </p>
      </div>
      <div className={styles.button__container}>
        <Link href="/">
          <Button theme="primary">Aceptar</Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
