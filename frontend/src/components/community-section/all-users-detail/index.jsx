import SwordIcon from "../../../assets/sword-icon.svg";
import AddIcon from "../../../assets/add-icon.svg";
import styles from "../all-users-detail/styles.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";

const AllUsersDetail = ({ data, background }) => {
  const dataLogin = useSelector(state => state.auth);
  const handleAddFriend = id => {
    const Url = "https://api-the-question-production.up.railway.app/api/v1/user/friend";
    axios
      .post(
        Url,
        {
          userId: dataLogin.id,
          addedUserId: id
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${dataLogin.token}`
          }
        }
      )
      .then(res => console.log(res, `Usuario con id: ${id} queda en estado pendiente`))
      .catch(err => console.log(err));
  };

  return (
    <div className={`${styles.container} ${background == "none" ? "" : styles.green}`}>
      <section className={styles.user__container}>
        <div className={styles.img__container}>
          <div className={styles.user__img}>
            <img
              style={{ borderRadius: "50%" }}
              width={40}
              height={40}
              src={data.profileImg}
              alt="img-perfil"
            />
          </div>
        </div>
        <div className={styles.username__container}>
          <p className={styles.user}>{data.username}</p>
          <p className={styles.point}>{data.points} Puntos</p>
        </div>
        <div className={styles.add__container}>
          <div onClick={() => handleAddFriend(data.id)} className={styles.button__add}>
            <Image src={AddIcon} width={33.33} height={33.33} alt="img-add-icon" />
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

export default AllUsersDetail;
