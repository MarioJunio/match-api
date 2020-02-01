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

    console.log(`${userLogged.name} nao gostou de ${userTarget.name}`);

    userLogged.dislikes.push(userTarget._id);
    userLogged.save();

    return res.json(userLogged);
  }
};
