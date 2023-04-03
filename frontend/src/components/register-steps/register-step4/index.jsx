import { useDispatch, useSelector } from "react-redux";
import styles from "../register-step4/styles.module.css";
import Button from "../../button/index";
import Link from "next/link";
import { useEffect, useState } from "react";
import { updateStep4, reset } from "@/features/reg/regSlice";
import { useRouter } from "next/router";
import { loginAuth } from "@/features/auth/authSlice";

const RegisterStep4 = () => {
  const store = useSelector(store => store.reg);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const postRegister = async data => {
    setIsLoading(true);
    /*  const response = await fetch("http://localhost:3000/api/register", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
     });
     const result = await response.json();
     console.log(result); */

    setTimeout(() => {
      dispatch(updateStep4());
      setIsLoading(false);
      dispatch(
        loginAuth({
          username: store.username
        })
      );
    }, 2000);
  };

  const handleReset = () => dispatch(reset());

  useEffect(() => {
    // get data from store and send to backend
    const data = {
      username: store.username,
      email: store.email,
      password: store.password,
      code: store.code
    };

    postRegister(data);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.container__top}></div>
      <div className={styles.container__bottom}>
        {isLoading ? (
          <div className={styles.bottom__text}>
            <p className={styles.text}>
              Aguarda un instante por favor estamos validando tus datos.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.bottom__text}>
              <p className={styles.text}> ¡El registro fué exitoso!</p>
              <p className={styles.text}> Te invitamos a aprender a jugar en un corto tutorial.</p>
            </div>
            <div className={styles.bottom__button}>
              <Link href="/tutorial" onClick={handleReset}>
                <Button
                  type="button"
                  theme="primary"
                  className="primary__medium"
                  width="180px"
                  height="46px"
                >
                  Comenzar
                </Button>
              </Link>
              <Link href="/" onClick={handleReset}>
                <Button
                  type="button"
                  theme="secondary"
                  className="primary__medium"
                  width="180px"
                  height="46px"
                >
                  Saltar tutorial
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterStep4;
