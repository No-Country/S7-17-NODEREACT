import { useEffect, useState } from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { endingMatch } from "../index";

function GameMultiplayer() {
  const [loader, setLoader] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [magicWand, setMagicWand] = useState(0);
  const [hammer, setHammer] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const token = useSelector(state => state.auth.token);
  const id = useSelector(state => state.auth.id);

  const room = JSON.parse(sessionStorage.getItem("roomMatch")) || {};
  const { dataRoom } = room;

  // Función para seleccionar una respuesta
  const handleSelectAnswer = answer => setSelectedAnswer(answer);

  // Función para comprobar la respuesta seleccionada por el usuario
  const checkAnswer = () => {
    if (id === room.userId) {
      if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
        setPoints(points + 20);
        room.dataRoom.player1.correctAnswers.push(dataRoom.questions[currentQuestionIndex].topicId);
        room.dataRoom.player1.points = points;
      } else {
        room.dataRoom.player1.incorrectAnswers.push(
          dataRoom.questions[currentQuestionIndex].topicId
        );
      }
    } else if (id === room.opponentUserId) {
      if (selectedAnswer === dataRoom.questions[currentQuestionIndex].correctAnswer) {
        setPoints(points + 20);
        room.dataRoom.player2.correctAnswers.push(dataRoom.questions[currentQuestionIndex].topicId);
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
        <div>
          <button onClick={() => magicWandUse()}>Varita</button>
          <button>Martillo</button>
          <h2>{currentQuestion.question}</h2>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>
                <button onClick={() => handleSelectAnswer(answer)} disabled={selectedAnswer !== ""}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
          <p>{`Tiempo restante: ${timeRemaining}s`}</p>
          <button onClick={checkAnswer} disabled={selectedAnswer === ""}>
            Responder
          </button>
        </div>
      ) : (
        <div>
          <h2>Trivia completada</h2>
          <p>{`Puntaje: ${points} de ${dataRoom?.questions.length}`}</p>
          <Link href="/">
            <button onClick={endTrivia}>Salir</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default GameMultiplayer;
