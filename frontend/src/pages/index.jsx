import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout";
import styles from "../pages/styles.module.css";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { session: isLoggedIn } = useSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, 3000);
  }, [isLoggedIn, router]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className={styles.container}>
            <div className={styles.options__link}>
              <div className={styles.link__container}>
                <Link className={styles.select__link} href="/game-solo">
                  <p>Solo</p>
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
