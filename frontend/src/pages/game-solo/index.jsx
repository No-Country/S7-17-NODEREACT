import { useEffect, useState } from "react";

const GameSolo = () => {
  const [room, setRoom] = useState({});

  return (
    <div>
      <button onClick={() => jugar()}>Jugar</button>
    </div>
  );
};

export default GameSolo;
