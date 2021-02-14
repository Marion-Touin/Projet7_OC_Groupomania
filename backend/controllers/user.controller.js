  
const db = require("../models/");
const User = db.users;
const Op = db.Sequelize.Op;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register users
let role = "";
exports.create = (req, res) => {
  if(req.body.email === "marion.touin@groupomania.com"){
    role = "admin"
  }else {
    role = "user"
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
                role: user.role,
                username: user.username,
                token: jwt.sign(
                  { id: user.id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: "8h"}),
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      }

    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
  const id = req.params.id;
  const newProfile = req.body ? {
    username: req.body.username,
    email : req.body.email,
    password : hash,
 } : {
  username: req.body.username,
  email : req.body.email,
  password : hash,
    } 
  User.update(newProfile, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur modifié."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour l'utilisateur avec l'id=${id}!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la mise à jour id=" + id
      });
    });
  })
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer id=${id}. `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Users with id=" + id
      });
    });
};

exports.getOneUser = (req, res, next) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
}

exports.getAllUser = (req, res, next) => {
 User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};