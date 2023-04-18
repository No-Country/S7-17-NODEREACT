import { useEffect } from "react";
import { useSelector } from "react-redux";

function GameMultiplayer() {
  // const socket = useSelector(state => state.socket);
  // console.log(socket);

  // useEffect(() => {
  //   socket.emit("message", "Hello World!");

  //   socket.on("message", data => {
  //     console.log(data);
  //   });
  // }, []);

  return <div>Buscando jugadores. Por favor espera unos segundos...</div>;
}

export default GameMultiplayer;
