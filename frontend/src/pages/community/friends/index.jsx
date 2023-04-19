import SearchUser from "@/components/community-section/search-user";
import styles from "../friends/styles.module.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import FriendsPending from "@/components/community-section/friends-pending";
import AllUsersDetail from "@/components/community-section/all-users-detail";
import useFetch from "@/hooks/useFetch";
import FriendsAccepted from "@/components/community-section/friends-accepted";
import Layout from "@/components/layout";

const Friends = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dataLogin = useSelector(state => state.auth);
  const { data: dataFriendsPending } = useFetch(`/user/${dataLogin.id}/friends/pending`);
  const { data: dataFriendsAccept } = useFetch(`/user/${dataLogin.id}/friends/accepted`);
  const { data: dataAllUsers } = useFetch(`/users/all`);
  const [windowWidth, setWindowWidth] = useState(useRef(window.innerWidth));

  return (
    <Layout>
      {windowWidth.current < 768 ? (
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
              : searchResults?.map(el => (
                  <AllUsersDetail background="green" key={el.id} data={el} />
                ))}

            {dataFriendsPending?.map(el => (
              <FriendsPending key={`${el.id}-${el.userAdded?.id}`} data={el} />
            ))}
            {dataFriendsAccept?.map(el => (
              <FriendsAccepted key={`${el.id}-${el.userAdded?.id}`} data={el} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.container__desktop}>
          <div className={styles.top__desktop}></div>
          <div className={styles.data__container}>
            <div className={styles.data__title}>
              <div className={styles.friends__title}>
                <p>Comunidad</p>
              </div>
              <div className={styles.friends__button}>
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
              </div>
              <div className={styles.friends__search}>
                <SearchUser
                  onChange={value => {
                    setSearchText(value);
                    setSearchResults(dataAllUsers.filter(users => users.username.includes(value)));
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.bot__desktop}>
            <div className={styles.data__friends__container}>
              {searchText == ""
                ? ""
                : searchResults?.map(el => (
                    <AllUsersDetail background="green" key={el.id} data={el} />
                  ))}

              {dataFriendsPending?.map(el => (
                <FriendsPending key={`${el.id}-${el.userAdded?.id}`} data={el} />
              ))}
              {dataFriendsAccept?.map(el => (
                <FriendsAccepted key={`${el.id}-${el.userAdded?.id}`} data={el} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Friends;
