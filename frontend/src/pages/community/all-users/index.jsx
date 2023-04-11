import SearchUser from "@/components/community-section/search-user";
import styles from "../all-users/styles.module.css";
import { useState } from "react";
import AllUsersDetail from "@/components/community-section/all-users-detail";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";

const AllUsers = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { data: dataAllUsers } = useFetch(`/users/all`);

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchUser
          onChange={value => {
            setSearchText(value);
            setSearchResults(dataAllUsers.filter(users => users.username.includes(value)));
          }}
        />
      </div>
      <div className={styles.title__container}>
        <p className={styles.title}>Comunidad</p>
      </div>
      <div className={styles.button__container}>
        <Link href="/community/friends">
          <button type="button" className={styles.button1}>
            Amigos
          </button>
        </Link>
        <button type="button" className={styles.button2}>
          Otros usuarios
        </button>
      </div>
      <div className={styles.userdetail__container}>
        {searchText == ""
          ? dataAllUsers?.map(el => <AllUsersDetail background="none" key={el.id} data={el} />)
          : searchResults?.map(el => <AllUsersDetail background="green" key={el.id} data={el} />)}
      </div>
    </div>
  );
};

export default AllUsers;
