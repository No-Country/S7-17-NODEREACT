import styles from "../register-step4/styles.module.css";
import Button from "../button";

const RegisterStep4 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text__container}>
        <p className={styles.text}>¡El registro fué exitoso!</p>
        <p className={styles.text}>Te invitamos a aprender a jugar en un corto tutorial.</p>
      </div>
      <div className={styles.container__button}>
        <Button theme="primary" className="primary__medium">
          Comenzar
        </Button>
        <Button theme="secondary" className="primary__medium">
          Saltar tutorial
        </Button>
      </div>
    </div>
  );
};

export default RegisterStep4;
