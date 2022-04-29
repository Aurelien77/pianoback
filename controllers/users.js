const { sign } = require("jsonwebtoken");
const { Users } = require("../models");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { email, username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "L'utilisateur n'existe pas" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match)
      res.json({ error: "Mauvaise combinaison du login et du Password" });

    const accessToken = sign(
      { username: user.username, id: user.id, prof:user.prof },
      `${process.env.CryptoJs_cle_token}`,
    );
    res.json({
      token: accessToken,
 /*      email: email, */
      username: username,
      id: user.id,
      admin: user.admin,
      prof: user.prof,
    });
  });
};

exports.auth = async (req, res) => {
  await res.json(req.user);
};

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (user)
    res.send({ error: "Cet username est déja utilisé par un autre compte " });

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      email: email,
      admin: false,
      prof: false, //modifié
    });
    res.json({ error: "L'utilisateur à été créé" });
  });
};


//Ce controller renvoit les infos par ID utilisateur

exports.basicInfo = async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
};





exports.postpriv = async (req, res) => {
  const id2 = req.params.id;

  const postpriv = await Users.findByPk(id2, {
    attributes: { exclude: ["password"] },
  });

  res.json(postpriv);
};






exports.changepassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({
    where: { username: req.user.username },
  });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      );
      res.json("SUCCESS");
    });
  });
};

exports.delete = async (req, res) => {
  const UsersId = req.params.id;
  await Users.destroy({
    where: {
      id: UsersId,
    },
  });

  res.json("Suppression du compte effectué");
};
