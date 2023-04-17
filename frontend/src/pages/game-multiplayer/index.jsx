import { useEffect } from "react";
import { useSelector } from "react-redux";

function GameMultiplayer() {
  // const { socket } = useSelector(state => state.socket);

  // useEffect(() => {
  //   socket.emit("message", "Hello World!");

  //   socket.on("message", data => {
  //     console.log(data);
  //   });
  // }, []);

  return <div>Soy página multijugador</div>;
}

export default GameMultiplayer;
