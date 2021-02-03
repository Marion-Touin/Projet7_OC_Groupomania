  
const db = require("../models/");
const User = db.users;
const Op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register users
let role = "";
exports.create = (req, res) => {
  if(req.body.email === "marion.touin@groupomania.com"){
    role = "ADMIN"
  }else {
    role = "USER"
  }
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        role : role,
        password: hash
      };
      User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la création de l'utilisateur."
        });
      });
    })
};

//login users
exports.login = (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else {
              res.status(201).json({
                id: user.id,
                token: jwt.sign(
                  { id: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: "10h"}),
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};