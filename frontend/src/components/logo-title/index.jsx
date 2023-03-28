import styles from "../logo-title/styles.module.css";
import Logo from "./logo";
import Title from "./title";

const LogoTitle = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <Title />
    </div>
  );
};

export default LogoTitle;
