import home from "../../assets/home-icon.svg";
import community from "../../assets/community-icon.svg";
import shop from "../../assets/shop-icon.svg";
import profile from "../../assets/profile-icon.svg";
import Image from "next/image";
import styles from "../navbar/styles.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.link__container}>
        <Link style={{ textDecoration: "none" }} href="/">
          <li className={styles.link}>
            <Image width={23} height={24} src={home} alt="" />
            <p className={styles.link__name}>Home</p>
          </li>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/community/friends">
          <li className={styles.link}>
            <Image width={24} height={24} src={community} alt="" />
            <p className={styles.link__name}>Comunidad</p>
          </li>
        </Link>
        <li className={styles.link}>
          <Image style={{ textDecoration: "none" }} width={24} height={24} src={shop} alt="" />
          <p className={styles.link__name}>Tienda</p>
        </li>
        <li className={styles.link}>
          <Image style={{ textDecoration: "none" }} width={24} height={24} src={profile} alt="" />
          <p className={styles.link__name}>Perfil</p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
