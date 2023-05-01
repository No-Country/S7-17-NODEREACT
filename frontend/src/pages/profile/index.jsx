import Layout from "@/components/layout";
import styles from "../profile/styles.module.css";
import editIcon from "../../assets/edit-icon.svg";
import coinIcon from "../../assets/coin-icon.svg";
import hammerIcon from "../../assets/hammer-icon.svg";
import wandIcon from "../../assets/magic-wand-icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearLoggedUser } from "@/features/auth/authSlice";
import { toast } from "react-toastify";
import { toastProperties } from "@/styles/toastProperties";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.auth);
  const [view, setView] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const clearCurrentUser = () => {
    localStorage.removeItem("user");
    toast.success("¡Hasta la vista! Esperamos verte pronto.", toastProperties);

    setTimeout(() => {
      router.push("/");
      dispatch(clearLoggedUser());
    }, 3000);
  };

  useEffect(() => {
    if (loggedUser.session === true) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${loggedUser.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedUser.token}`
          }
        })
        .then(res => {
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <>
      {loggedUser.session === true ? (
        <Layout>
          <div className={styles.container}>
            <div className={styles.top}></div>
            <div className={styles.data__container}>
              <div className={styles.data}>
                <div className={styles.title__container}>
                  <p>Perfil</p>
                </div>
                <div className={styles.img__container}>
                  <div className={styles.imgrounded}>
                    <img className={styles.img} src={currentUser?.profileImg} alt="" />
                    <div className={styles.edit__img}>
                      <Image width={22} height={22} src={editIcon} alt="" />
                    </div>
                  </div>
                </div>
                <div className={styles.username__container}>
                  <div className={styles.username}>
                    <p>{currentUser?.username}</p>
                    <div className={styles.edit__user}>
                      <Image width={22} height={22} src={editIcon} alt="" />
                    </div>
                  </div>
                </div>
                <div className={styles.point__container}>
                  <div className={styles.point__number}>
                    <p>{currentUser?.points}</p>
                  </div>
                  <div className={styles.point__title}>
                    <p>Puntos</p>
                  </div>
                  <div className={styles.coin__icon}>
                    <div className={styles.coin__img__container}>
                      <div className={styles.coin__img}>
                        <Image width={35} height={35} src={coinIcon} alt="" />
                        <div className={styles.coin__number}>{currentUser?.coins}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.coin__name}>
                    <p>Monedas</p>
                  </div>
                </div>
                <div className={styles.ventajas__container}>
                  <p className={styles.ventajas__title}>Ventajas</p>
                  <div className={styles.hammer__container}>
                    <div className={styles.hammer__icon}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        width={30}
                        height={30}
                        src={hammerIcon}
                        alt=""
                      />
                      <div className={styles.hammer__number}>
                        {currentUser?.advantages &&
                          currentUser.advantages[0]?.user_advantage.quantity}
                      </div>
                    </div>
                    <p>Martillos</p>
                  </div>
                  <div className={styles.wand__container}>
                    <div className={styles.hammer__icon}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        width={30}
                        height={30}
                        src={wandIcon}
                        alt=""
                      />
                      <div className={styles.hammer__number}>
                        {currentUser?.advantages &&
                          currentUser.advantages[1]?.user_advantage.quantity}
                      </div>
                    </div>
                    <p>Varitas mágicas</p>
                  </div>
                </div>
                <div className={styles.partidas__container}>
                  <p className={styles.ventajas__title}>Partidas</p>
                  <div className={styles.partidas}>
                    <p>12</p>
                    <p>Ganadas</p>
                  </div>
                  <div className={styles.partidas}>
                    <p>7</p>
                    <p>Perdidas</p>
                  </div>
                </div>
              </div>
            </div>

            {view === "" ? (
              <div className={styles.bottom__container}>
                <div className={styles.bottom__link}>
                  <p>Cambiar contraseña</p>
                  <p>Noticias</p>
                  <p onClick={() => setView("logout")}>Cerrar sesión</p>
                </div>
              </div>
            ) : view === "logout" ? (
              <div className={styles.logoutContainer}>
                <div className={styles.logout}>
                  <p>¿Deseas cerrar tu sesión?</p>
                  <div className={styles.buttonContainer}>
                    <button className={styles.btn1} onClick={() => clearCurrentUser()}>
                      Aceptar
                    </button>
                    <button className={styles.btn2} onClick={() => setView("")}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Layout>
      ) : (
        <>
          <h1>401: No autorizado</h1>
          <h3>No tenés permiso. Por favor, iniciá sesión primero.</h3>
        </>
      )}
    </>
  );
};

export default Profile;
