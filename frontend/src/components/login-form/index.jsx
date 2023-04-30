import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../button";
import styles from "../login-form/styles.module.css";
import { loginAuth } from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import Img from "../../assets/logo.svg";
import Image from "next/image";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [login, setLogin] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const { push } = useRouter();
  const postLogin = useMutation();

  const toastProperties = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  };

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!login.username || !login.password)
      return toast.error("Debés llenar todos los campos para poder continuar.", toastProperties);

    postLogin
      .mutate("/auth/login", login)
      .then(response => {
        toast.success(`¡Bienvenido ${response.data.username}!`, toastProperties);
        setTimeout(() => {
          dispatch(loginAuth(response.data));
          push("/");
        }, 3000);
      })
      .catch(error => {
        switch (error.response.data.error) {
          case "Incorrect password":
            toast.error("Contraseña incorrecta.", toastProperties);
            break;
          case "User not found":
            toast.error("No existe una cuenta con ese nombre de usuario.", toastProperties);
            break;
          default:
            toast.error(
              "¡Ha ocurrido un error! Por favor, revisá tu conexión a internet e intentalo nuevamente.",
              toastProperties
            );
            break;
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.register__logo}>
        <Image
          placeholder="blur"
          blurDataURL={"../../assets/logo.svg"}
          src={Img}
          width={214}
          height={134}
          alt="imagen-logo"
        />
      </div>
      <form onSubmit={handleSubmit} className={styles.register__form}>
        <div className={styles.form__top}>
          <p className={styles.container__title}>Iniciar sesión</p>
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
              type="password"
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
        </div>

        <div className={styles.form__button}>
          <Button theme="primary" className="" width="156px" height="46px">
            Aceptar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
