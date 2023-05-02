import Image from "next/image";
import styles from "../unauthorized/styles.module.css";
import logoImg from "../../assets/logo.svg";
import errorImg from "../../assets/error-401.png";
import Router from "next/router";

const Unauthorized = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLogo}>
        <Image
          placeholder="blur"
          blurDataURL={"../../assets/logo.svg"}
          src={logoImg}
          width={214}
          height={134}
          alt="logo-img"
        />
      </div>
      <div className={styles.containerImg}>
        <Image src={errorImg} width={350} height={330} alt="unauthorized-img" />
      </div>
      <div className={styles.containerBtn}>
        <button className={styles.btn} onClick={() => Router.push("/")}>
          Iniciá sesión
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
