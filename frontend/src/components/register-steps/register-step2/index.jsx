import Image from "next/image";
import Img from "../../../assets/logo.svg";
import Button from "@/components/button";
import styles from "../register-step2/styles.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, updateStep2 } from "@/features/reg/regSlice";
import useMutation from "@/hooks/useMutation";
import { toast } from "react-toastify";

const RegisterStep2 = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.reg);
  const [email, setEmail] = useState(store.email);
  const [password, setPassword] = useState(store.password);
  const [password2, setPassword2] = useState(store.password);
  const postRegister = useMutation();

  const toastProperties = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  };

  const handlePreviousPage = e => {
    e.preventDefault();
    dispatch(changePage(-1));
  };

  const handleNextPage = async e => {
    e.preventDefault();

    if (!email || !password || !password2)
      return toast.error("Debés llenar todos los campos para poder continuar.", toastProperties);

    if (password === password2) {
      await postRegister
        .mutate("/user/register", { username: store.username, email, password })
        .then(res => {
          dispatch(updateStep2({ email, password }));
          dispatch(changePage(1));
        })
        .catch(err => {
          switch (err.response && err.response.data.error) {
            case "Username already exists":
              toast.error("Nombre de usuario ya existente.", toastProperties);
              break;
            case "Email already exists":
              toast.error("Correo electrónico ya existente.", toastProperties);
              break;
            case "Invalid email":
              toast.error("Email inválido.", toastProperties);
              break;
            default:
              toast.error(
                "¡Ha ocurrido un error! Por favor, revisá tu conexión a internet e intentalo nuevamente.",
                toastProperties
              );
              break;
          }
        });
    } else {
      toast.error("¡Las contraseñas no coinciden!", toastProperties);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <div className={styles.logo__desktop}>
          <Image
            placeholder="blur"
            blurDataURL={"../../../assets/logo.svg"}
            src={Img}
            width={214}
            height={134}
            alt="imagen-logo"
          />
        </div>
        <p className={styles.container__title}>Registrate</p>
      </div>
      <form className={styles.container__bottom}>
        <div className={styles.form}>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu correo
            </label>
            <input
              className={styles.form__input}
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu contraseña
            </label>
            <input
              className={styles.form__input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Reingresá tu contraseña
            </label>
            <input
              className={styles.form__input}
              type="password"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button
            type="button"
            onClick={handlePreviousPage}
            theme="primary"
            className=""
            width="156px"
            height="46px"
          >
            Volver
          </Button>
          <Button
            type="submit"
            onClick={handleNextPage}
            theme="primary"
            className=""
            width="156px"
            height="46px"
          >
            Aceptar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStep2;
