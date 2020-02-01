const express = require("express");
const routes = express.Router();

const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

// rota para buscar os devs para match
routes.get("/devs", DevController.index);

// rota para incluir um novo dev
routes.post("/devs", DevController.store);

// rota para dar like no desenvolvedor
routes.post("/devs/:devId/likes", LikeController.store);

// rota para dar dislike no desenvolvedor
routes.post("/devs/:devId/dislikes", DislikeController.store);

module.exports = routes;
