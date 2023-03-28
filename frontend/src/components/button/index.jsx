import styles from "../button/styles.module.css";

const Button = ({ children, theme, className }) => {
  return (
    <button
      className={`${styles.container} ${theme === "primary" ? styles.primary : styles.secondary} ${
        className === "primary__medium" ? styles.primary__medium : ""
      }
      ${className === "primary__bigger" ? styles.primary__big : ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
