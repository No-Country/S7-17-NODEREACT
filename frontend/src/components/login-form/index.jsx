import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button";
import styles from "../login-form/styles.module.css";
import { loginAuth } from "@/features/auth/authSlice";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [login, setLogin] = useState({ username: "", password: "", session: false });
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const { push } = useRouter();

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value.toLowerCase()
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (login.username !== "" && login.password !== "") {
      dispatch(loginAuth(login));
      if (authState.session) {
        push("/");
      }
    } else {
      console.log("Los campos no pueden ir");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.container__title}>Iniciar sesión</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__container}>
          <label className={styles.form__label} htmlFor="">
            Ingresá tu usuario
          </label>
          <input
            name="username"
            onChange={handleChange}
            className={styles.form__input}
            type="text"
          />
        </div>
        <div className={styles.form__container}>
          <label className={styles.form__label} htmlFor="">
            Ingresá tu contraseña
          </label>
          <input
            name="password"
            onChange={handleChange}
            className={styles.form__input}
            type="text"
          />
        </div>
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
          <Button theme="primary">Aceptar</Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
