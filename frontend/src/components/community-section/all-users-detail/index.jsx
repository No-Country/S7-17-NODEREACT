import SwordIcon from "../../../assets/sword-icon.svg";
import AddIcon from "../../../assets/add-icon.svg";
import styles from "../all-users-detail/styles.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsersDetail = ({ data, background }) => {
  const dataLogin = useSelector(state => state.auth);
  const handleAddFriend = id => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/friend`,
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
      .then(res => {
        toast.success("¡Solicitud de amistad enviada con éxito!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        });
      })
      .catch(err => {
        switch (err.response.data.error) {
          case "Already friends":
            toast.info("¡Este usuario ya es tu amigo!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            });
          case "Pending friend request":
            toast.warning("Ya has enviado una solicitud de amistad a este usuario.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            });
            break;
          case "Refused friend request":
            toast.error("Este usuario ha rechazado tu solictud de amistad.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark"
            });
            break;
          default:
            console.error(err);
            break;
        }
      });
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
