const app = require("./app");
const sockeIO = require("socket.io");
const http = require("http");
const swaggerDocs = require("../swagger");
require("dotenv").config();

const server = http.createServer(app);
const io = sockeIO(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

io.on("connection", socket => {
  console.log("User connected to socket server");

  socket.on("disconnect", () => {
    console.log("User disconnected from socket server");
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Run server in ${process.env.host}/`);
  swaggerDocs(app, PORT);
});
