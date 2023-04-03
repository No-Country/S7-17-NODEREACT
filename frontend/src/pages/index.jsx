import Loader from "@/components/loader";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout";

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

  return <>{loading ? <Loader /> : <Layout>{<main>Hola Mundo</main>}</Layout>}</>;
}
