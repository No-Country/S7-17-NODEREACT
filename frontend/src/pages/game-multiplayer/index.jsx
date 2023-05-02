import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { endingMatch } from "../index";
import hammerIcon from "../../assets/hammer-icon.svg";
import wandIcon from "../../assets/magic-wand-icon.svg";
import Image from "next/image";
import Unauthorized from "@/components/unauthorized";

function GameMultiplayer() {
  const [loader, setLoader] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [magicWand, setMagicWand] = useState(0);
  const [hammer, setHammer] = useState(0);
  const id = useSelector(state => state.auth.id);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    setHammer(user.advantages && user.advantages[0].user_advantage.quantity);
    setMagicWand(user.advantages && user.advantages[1].user_advantage.quantity);
  }, [user]);

  const room = JSON.parse(sessionStorage.getItem("roomMatch")) || {};
  const { dataRoom } = room;

  // Función para seleccionar una respuesta
  const handleSelectAnswer = answer => setSelectedAnswer(answer);

  // Función para comprobar la respuesta seleccionada por el usuario
  const checkAnswer = answer => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      if (id === room.userId) {
        if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
          setPoints(points + 20);
          room.dataRoom.player1.correctAnswers.push(
            dataRoom.questions[currentQuestionIndex].topicId
          );
          room.dataRoom.player1.points = points;
        } else {
          room.dataRoom.player1.incorrectAnswers.push(
            dataRoom.questions[currentQuestionIndex].topicId
          );
        }
      } else if (id === room.opponentUserId) {
        if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
          setPoints(points + 20);
          room.dataRoom.player2.correctAnswers.push(
            dataRoom.questions[currentQuestionIndex].topicId
          );
          room.dataRoom.player2.points = points;
        } else {
          room.dataRoom.player2.incorrectAnswers.push(
            dataRoom.questions[currentQuestionIndex].topicId
          );
        }
      }
      setSelectedAnswer("");
      setTimeRemaining(15);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      sessionStorage.setItem("roomMatch", JSON.stringify(room));
    }, 500);
  };

  // Función para reiniciar la trivia
  const endTrivia = () => {
    if (id === room.userId) {
      dataRoom.player1.points = points;
      endingMatch({ id: room.id, player1: dataRoom.player1 });
    } else if (id === room.opponentUserId) {
      dataRoom.player2.points = points;
      endingMatch({ id: room.id, player2: dataRoom.player2 });
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
    setMagicWand(magicWand - 1);
    setTimeRemaining(timeRemaining + 5);
  };

  return (
    <>
      {id ? (
        <>
          {loader ? (
            <div className={styles.container}>
              <span className={styles.text}>
                Buscando jugadores. Por favor, espera unos segundos...
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
                  onClick={endTrivia}
                >
                  Salir
                </button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default GameMultiplayer;
