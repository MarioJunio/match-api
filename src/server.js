const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  connectedUsers[socket.handshake.query.user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://mariojboss:bitlyuf90@mariocloud-t0kol.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(8080);
