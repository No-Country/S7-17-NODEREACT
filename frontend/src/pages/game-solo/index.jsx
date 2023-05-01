import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../game-solo/styles.module.css";
import Link from "next/link";
import hammerIcon from "../../assets/hammer-icon.svg";
import wandIcon from "../../assets/magic-wand-icon.svg";
import Image from "next/image";

const GameSolo = () => {
  const [loader, setLoader] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [magicWand, setMagicWand] = useState(0);
  const [hammer, setHammer] = useState(0);
  const token = useSelector(state => state.auth.token);

  const room = JSON.parse(sessionStorage.getItem("room")) || {};
  const { dataRoom } = room;

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    setHammer(user.advantages && user.advantages[0].user_advantage.quantity);
    setMagicWand(user.advantages && user.advantages[1].user_advantage.quantity);
  }, [user]);

  // Función para comprobar la respuesta seleccionada por el usuario
  const checkAnswer = answer => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
        setPoints(points + 20);
        room.dataRoom.player.correctAnswers.push(dataRoom.questions[currentQuestionIndex].topicId);
        room.dataRoom.player.points = points;
      } else {
        room.dataRoom.player.incorrectAnswers.push(
          dataRoom.questions[currentQuestionIndex].topicId
        );
      }
      setSelectedAnswer("");
      setTimeRemaining(15);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      sessionStorage.setItem("room", JSON.stringify(room));
    }, 1000);
  };

  // Función para reiniciar la trivia
  const resetTrivia = () => {
    if (dataRoom && dataRoom.player) {
      dataRoom.player.points = points;
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/room/${room.id}/solitary`, dataRoom.player, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
    }
  };

  // Muestra la pregunta actual y las opciones de respuesta
  const currentQuestion = dataRoom?.questions[currentQuestionIndex];
  let answers = [];
  if (currentQuestion) answers = [...currentQuestion?.allAnswers];

  const hasTimeRemaining = timeRemaining > 0 && currentQuestionIndex < dataRoom?.questions.length;

  // Utiliza useEffect para actualizar el temporizador
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    // Cuando el tiempo se agote o se cambie de pregunta, reinicia el temporizador
    if (currentQuestionIndex >= dataRoom?.questions.length) {
      clearInterval(intervalId);
    }
    if (timeRemaining === 0) {
      setTimeRemaining(15);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    return () => clearInterval(intervalId);
  }, [currentQuestionIndex, timeRemaining]);

  if (loader) setTimeout(() => setLoader(false), 5000);

  const magicWandUse = () => {
    if (magicWand >= 1) {
      setMagicWand(magicWand - 1);
      setTimeRemaining(timeRemaining + 5);
    }
  };

  return (
    <div>
      {loader ? (
        <div className={styles.container}>
          <span className={styles.text}>
            Por favor, aguarda un instante. Estamos creando tu partida...
          </span>
          <div className={styles.spinnerContainer}>
            <div className={styles.ldsRipple}>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {hasTimeRemaining ? (
        <div className={styles.container__game}>
          <div
            className={styles.game__top}
            style={{
              backgroundImage: `url(${currentQuestion.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "60%",
              transition: "all 1s linear"
            }}
          >
            <div className={styles.top__time}>
              <div className={styles.time__container}>
                <p>{`${timeRemaining}`}</p>
                <div className={styles.time__second}>"</div>
              </div>
            </div>
            <div className={styles.top__question}>
              <div className={styles.ventajas}>
                <div className={styles.ventajas__icon} onClick={() => magicWandUse()}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={40}
                    height={40}
                    src={wandIcon}
                    alt=""
                  />
                  <div className={styles.ventajas__number}>{magicWand}</div>
                </div>
                <div className={styles.ventajas__icon}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={40}
                    height={40}
                    src={hammerIcon}
                    alt=""
                  />
                  <div className={styles.ventajas__number}>{hammer}</div>
                </div>
              </div>
              <div className={styles.question}>
                <span className={styles.game__question}>{currentQuestion.question}</span>
              </div>
            </div>
          </div>
          <div className={styles.game__bottom}>
            {answers.map((answer, index) => (
              <div className={styles.boton__container} key={index}>
                <div
                  style={{
                    backgroundColor: selectedAnswer === answer ? "#00f" : "#fff"
                  }}
                  className={styles.boton__choose}
                  onClick={() => checkAnswer(answer)}
                  disabled={selectedAnswer !== ""}
                >
                  {answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "black",
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px"
          }}
        >
          <p style={{ color: "white", fontSize: "30px" }}>¡¡Fin de la partida!!</p>
          <p
            style={{ color: "white", fontSize: "24px" }}
          >{`Puntaje: ${points} de ${dataRoom?.questions.length}`}</p>
          <Link href="/">
            <button
              style={{
                fontSize: "24px",
                color: "black",
                background: "white",
                borderRadius: "20px",
                padding: "5px 10px"
              }}
              onClick={resetTrivia}
            >
              Salir
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GameSolo;
