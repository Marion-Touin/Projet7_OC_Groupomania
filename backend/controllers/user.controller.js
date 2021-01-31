  
const db = require("../models/");
const User = db.users;
const Op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let role = "";
exports.create = (req, res) => {
  if(req.body.email === "marion.touin@groupomania.com"){
    role = "MODO"
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