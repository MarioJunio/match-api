const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  // busca todos os devs disponiveis para likes
  async index(req, res) {
    const { userid } = req.headers;

    // busca usuario logado
    const user = await Dev.findById(userid);

    if (!user) {
      return res.status(400).json("Usuário não encontrado");
    }

    // busca todos os devs disponiveis para jogar
    const devsAvailabe = await Dev.find({
      $and: [
        { _id: { $ne: user._id } },
        { _id: { $nin: user.likes } },
        { _id: { $nin: user.dislikes } }
      ]
    });

    return res.json(devsAvailabe);
  },

  // cria um novo dev
  async store(req, res) {
    // usuario do Github
    const { user } = req.body;

    // verifica se o usuario ja esta cadastrado
    const userSearch = await Dev.findOne({ user });

    if (userSearch) {
      return res.json(userSearch);
    }

    // busca as informacoes do usuario no Github
    const response = await axios.get(`https://api.github.com/users/${user}`);

    const { name, bio, avatar_url: avatar } = response.data;

    // cria novo Desenvolvedor utilizando o Model
    const devCreated = await Dev.create({
      name: name ? name : user,
      user,
      bio,
      avatar
    });

    // retorna a resposta em formato JSON
    return res.status(201).json(devCreated);
  }
};
