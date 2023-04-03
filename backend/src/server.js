const app = require("./app");
const swaggerDocs = require("../swagger");
const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

io.on("connection", socket => {});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  swaggerDocs(app, PORT);
});
