import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/layout";

export default function Home() {
  const { session: isLoggedIn } = useSelector(state => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <Layout>
      <main>Hola Mundo</main>
    </Layout>
  );
}
