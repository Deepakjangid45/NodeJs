const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(express.static("public"));

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A new user has connect", socket.id);
});

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(8080, () => {
  console.log(`server listen at port 8080`);
});
