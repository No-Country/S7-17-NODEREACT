const getRandom = (questions, count) => {
  const result = [];
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomObject = questions[randomIndex];
    if (!result.includes(randomObject)) {
      result.push(randomObject);
    }
  }
  return result;
};

module.exports = getRandom;
