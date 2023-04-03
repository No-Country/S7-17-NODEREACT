import styles from "../login/styles.module.css";
import Logo from "../../assets/logo.svg";
import Button from "@/components/button";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";

const Login = () => {
  const [loginForm, setLoginForm] = useState(false);
  const authState = useSelector(state => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (authState.session) {
      push("/");
    }
  }, [push, authState]);

  return (
    <div className={styles.container}>
      {loginForm ? (
        <LoginForm />
      ) : (
        <section className={styles.section}>
          <div className={styles.section__logo}>
            <Image
              placeholder="blur"
              blurDataURL={"../../assets/logo.svg"}
              src={Logo}
              width={214}
              height={134}
              alt="imagen-logo"
            />
          </div>

          <div className={styles.section__button}>
            <div onClick={() => setLoginForm(!loginForm)}>
              <Button theme="primary" className="primary__bigger" width="307px" height="54px">
                Iniciar Sesión
              </Button>
            </div>
            <Link href="/register">
              <Button theme="secondary" className="primary__bigger" width="307px" height="54px">
                Registrarse
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;
