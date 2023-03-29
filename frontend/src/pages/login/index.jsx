import styles from "../login/styles.module.css";
import LogoTitle from "@/components/logo-title";
import Button from "@/components/button";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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
      <LogoTitle />
      {loginForm ? (
        <LoginForm />
      ) : (
        <div className={styles.button__container}>
          <div onClick={() => setLoginForm(!loginForm)}>
            <Button theme="primary" className="primary__bigger">
              Iniciar Sesión
            </Button>
          </div>
          <Link href="/register">
            <Button theme="secondary" className="primary__bigger">
              Registrarse
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
