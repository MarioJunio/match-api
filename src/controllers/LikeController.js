const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const userLogged = await Dev.findById(user);
    const userTarget = await Dev.findById(devId);

    if (!userTarget) {
      return res.status(400).json("Dev não encontrado");
    }

    // console.log(`${userLogged.name} gostou de ${userTarget.name}`);

    userLogged.likes.push(userTarget._id);
    userLogged.save();

    if (userTarget.likes.includes(userLogged._id)) {
      const userLoggedSocket = req.connectedUsers[userLogged._id];
      const userTargetSocket = req.connectedUsers[userTarget._id];

      if (userLoggedSocket) {
        req.io.to(userLoggedSocket).emit("match", userTarget);
      }

      if (userTargetSocket) {
        req.io.to(userTargetSocket).emit("match", userLogged);
      }
    }

    return res.json({ user: userLogged, match: false });
  }
};
