const changePosition = questions => {
  questions.forEach(question => {
    const allAnswers = [question.correctAnswer, ...question.incorrectAnswers];
    // Mezclar las respuestas de manera aleatoria
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    question.allAnswers = allAnswers;
  });
  return questions;
};

module.exports = changePosition;
