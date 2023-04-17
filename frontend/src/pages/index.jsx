import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/layout";
import styles from "../pages/styles.module.css";
import Link from "next/link";
import axios from "axios";
import io from "socket.io-client";
import { setSocket } from "@/features/socket/socketSlice";
import imgM1 from "../assets/b-mobile-home/image-1.svg";
import imgM2 from "../assets/b-mobile-home/image-2.svg";
import imgM3 from "../assets/b-mobile-home/image-3.svg";
import imgM4 from "../assets/b-mobile-home/image-4.svg";
import imgM5 from "../assets/b-mobile-home/image-5.svg";
import imgM6 from "../assets/b-mobile-home/image-6.svg";
import imgD1 from "../assets/b-desktop-home/imagen1-desktop.svg";
import imgD2 from "../assets/b-desktop-home/imagen2-desktop.svg";
import imgD3 from "../assets/b-desktop-home/imagen3-desktop.svg";
import imgD4 from "../assets/b-desktop-home/imagen4-desktop.svg";
import imgD5 from "../assets/b-desktop-home/imagen5-desktop.svg";
import imgD6 from "../assets/b-desktop-home/imagen6-desktop.svg";

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { session: isLoggedIn } = useSelector(state => state.auth);
  const router = useRouter();

  const [windowWidth, setWindowWidth] = useState(useRef(window.innerWidth));

  const [currentImage, setCurrentImage] = useState(0);
  const images = [imgM1, imgM2, imgM3, imgM4, imgM5, imgM6];
  const images2 = [imgD1, imgD2, imgD3, imgD4, imgD5, imgD6];
  const intervalTime = 3000;
  let intervalId;

  const userId = useSelector(state => state.auth.id);
  const token = useSelector(state => state.auth.token);

  const dispatch = useDispatch();
  dispatch(setSocket({ socket }));

  const jugar = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/room/solitary`,
        { userId },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => console.log(res.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, 3000);
  }, [isLoggedIn, router]);

  useEffect(() => {
    const changeImage = () => {
      setCurrentImage(currentImage => (currentImage + 1) % images.length);
    };
    intervalId = setInterval(changeImage, intervalTime);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div
            className={styles.container}
            style={{
              backgroundImage: `url(${
                windowWidth.current < 768 ? images[currentImage].src : images2[currentImage].src
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100vw",
              height: "100vh"
            }}
          >
            <div className={styles.options__link}>
              <div className={styles.link__container}>
                <Link className={styles.select__link} href="/game-solo">
                  <p onClick={() => jugar()}>Solo</p>
                </Link>
                <Link className={styles.select__link} href="/game-multiplayer">
                  <p>Multiplayer</p>
                </Link>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  );
}
