import styles from "../register-step3/styles.module.css";
import Image from "next/image";
import Img from "../../../assets/logo.svg";
import Button from "@/components/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePage, updateStep3 } from "@/features/reg/regSlice";

const RegisterStep3 = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const handlePreviousPage = e => {
    e.preventDefault();
    dispatch(changePage(-1));
  };
  const handleNextPage = e => {
    e.preventDefault();
    if (code.length > 0) {
      dispatch(updateStep3({ code }));
      dispatch(changePage(1));
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__top}>
        <Image
          placeholder="blur"
          blurDataURL={"../../../assets/logo.svg"}
          src={Img}
          width={214}
          height={134}
          alt="imagen-logo"
        />
        <p className={styles.container__title}>Registrate</p>
      </div>
      <form className={styles.container__bottom}>
        <div className={styles.form}>
          <p className={styles.text}>Hemos enviado un código a tu correo.</p>
          <p className={styles.text}>Colócalo aquí para continuar.</p>
          <div className={styles.form__container}>
            <label className={styles.form__label} htmlFor="">
              Ingresá tu código
            </label>
            <input
              className={styles.form__input}
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
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

export default RegisterStep3;
