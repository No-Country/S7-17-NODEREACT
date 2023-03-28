import styles from "../login/styles.module.css";
import LogoTitle from "@/components/logo-title";
import Button from "@/components/button";
import Link from "next/link";
import LoginForm from "@/components/login-form";
import { useState } from "react";

const Login = () => {
  const [loginForm, setLoginForm] = useState(false);
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
