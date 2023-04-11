import SearchUser from "@/components/community-section/search-user";
import styles from "../friends/styles.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import FriendsPending from "@/components/community-section/friends-pending";
import AllUsersDetail from "@/components/community-section/all-users-detail";
import useFetch from "@/hooks/useFetch";
import FriendsAccept from "@/components/community-section/friends-accept";

const Friends = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dataLogin = useSelector(state => state.auth);
  const { data: dataFriendsPending } = useFetch(`/user/${dataLogin.id}/friends/pending`);
  const { data: dataFriendsAccept } = useFetch(`/user/${dataLogin.id}/friends/accept`);
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
        <button type="button" className={styles.button1}>
          Amigos
        </button>
        <Link href="/community/all-users">
          <button type="button" className={styles.button2}>
            Otros usuarios
          </button>
        </Link>
      </div>
      <div className={styles.userdetail__container}>
        {searchText == ""
          ? ""
          : searchResults?.map(el => <AllUsersDetail background="green" key={el.id} data={el} />)}

        {dataFriendsPending?.map(el => (
          <FriendsPending key={`${el.id}-${el.userAdded?.id}`} data={el} />
        ))}
        {dataFriendsAccept?.map(el => (
          <FriendsAccept key={`${el.id}-${el.userAdded?.id}`} data={el} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
