import Image from "next/image";
import styles from "../friends-accepted/styles.module.css";
import RemoveIcon from "../../../assets/remove-icon.svg";
import SwordIcon from "../../../assets/sword-icon.svg";

const FriendsAccepted = ({ data }) => {
  return (
    <div className={styles.container}>
      <section className={styles.user__container}>
        <div className={styles.img__container}>
          <div className={styles.user__img}>
            <img
              style={{ borderRadius: "50%" }}
              width={40}
              height={40}
              src={data.userAdded?.profileImg}
              alt="img-perfil"
            />
          </div>
        </div>
        <div className={styles.username__container}>
          <p className={styles.user}>{data.userAdded?.username}</p>
          <p className={styles.point}>{data.status}</p>
        </div>
        <div className={styles.delete__container}>
          <div className={styles.button__remove}>
            <Image src={RemoveIcon} width={14} height={18} alt="img-remove-icon" />
          </div>
        </div>
        <div className={styles.duel__container}>
          <div className={styles.button__duel}>
            <Image src={SwordIcon} width={25.61} height={24.81} alt="img-sword-icon" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FriendsAccepted;
