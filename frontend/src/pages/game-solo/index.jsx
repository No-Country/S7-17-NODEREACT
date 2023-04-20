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
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [magicWand, setMagicWand] = useState(0);
  const [hammer, setHammer] = useState(0);

  const token = useSelector(state => state.auth.token);

  const room = JSON.parse(sessionStorage.getItem("room")) || {};
  const { dataRoom } = room;
  // Función para seleccionar una respuesta
  const handleSelectAnswer = answer => setSelectedAnswer(answer);

  // Función para comprobar la respuesta seleccionada por el usuario
  const checkAnswer = () => {
    if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
      setPoints(points + 20);
      room.dataRoom.player.correctAnswers.push(dataRoom.questions[currentQuestionIndex].topicId);
      room.dataRoom.player.points = points;
    } else {
      room.dataRoom.player.incorrectAnswers.push(dataRoom.questions[currentQuestionIndex].topicId);
    }
    setSelectedAnswer("");
    setTimeRemaining(15);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    sessionStorage.setItem("room", JSON.stringify(room));
  };

  // Función para reiniciar la trivia
  const resetTrivia = () => {
    dataRoom.player.points = points;
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/room/${room.id}/solitary`, dataRoom.player, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
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

  if (loader) setTimeout(() => setLoader(false), 1000);

  const magicWandUse = () => {
    setMagicWand(magicWand + 1);
    setTimeRemaining(timeRemaining + 5);
  };
  return (
    <div>
      {loader ? (
        <div className={styles.container}>
          <span className={styles.text}>
            Aguarda un instante por favor estamos creando su partida.
          </span>
          <div className={styles.snipetContainer}>
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
                  <div className={styles.ventajas__number}>0</div>
                </div>
                <div className={styles.ventajas__icon}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    width={40}
                    height={40}
                    src={hammerIcon}
                    alt=""
                  />
                  <div className={styles.ventajas__number}>0</div>
                </div>
              </div>
              <div className={styles.question}>
                <div
                  className={styles.responder}
                  onClick={checkAnswer}
                  disabled={selectedAnswer === ""}
                >
                  Responder
                </div>
                <span className={styles.game__question}>{currentQuestion.question}</span>
              </div>
            </div>
          </div>
          <div className={styles.game__bottom}>
            {answers.map((answer, index) => (
              <div className={styles.boton__container} key={index}>
                <div
                  className={styles.boton__choose}
                  onClick={() => handleSelectAnswer(answer)}
                  disabled={selectedAnswer !== ""}
                >
                  {answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Trivia completada</h2>
          <p>{`Puntaje: ${points} de ${dataRoom?.questions.length}`}</p>
          <Link href="/">
            <button onClick={resetTrivia}>Salir</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default GameSolo;
