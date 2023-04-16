import styles from "../login/styles.module.css";
import Logo from "../../assets/logo.svg";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";

const Login = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [windowWidth, setWindowWidth] = useState(useRef(window.innerWidth));
  const authState = useSelector(state => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (authState.session) {
      push("/");
    }
  }, [push, authState]);

  return (
    <div className={styles.container}>
      <div className={`${loginForm ? styles.form : styles.none}`}>
        <LoginForm />
      </div>
      <section className={styles.section}>
        <div className={styles.section__logo}>
          <Image
            placeholder="blur"
            blurDataURL={"../../assets/logo.svg"}
            src={Logo}
            width={`${windowWidth.current < 768 ? 214 : 380}`}
            height={`${windowWidth.current < 768 ? 134 : 212}`}
            alt="imagen-logo"
          />
        </div>

        <div className={styles.section__button}>
          <div onClick={() => setLoginForm(!loginForm)}>
            <button className={styles.button1}>Iniciar Sesión</button>
          </div>
          <Link href="/register">
            {/* <Button theme="secondary" className="primary__bigger" width="307px" height="54px">
              Registrarse
            </Button> */}
            <button className={styles.button2}>Registrarse</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
