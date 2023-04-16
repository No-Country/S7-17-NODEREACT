import { useEffect } from "react";
import socket from "../../socket";
import { useSelector } from "react-redux";

function GameMultiplayer() {
  const authState = useSelector(state => state.auth);

  useEffect(() => {
    socket.emit("invitation random", { userId: authState.id, token: authState.token });

    socket.on("message", data => {
      console.log(data);
    });
  }, []);

  return <div>Soy página multijugador</div>;
}

export default GameMultiplayer;
