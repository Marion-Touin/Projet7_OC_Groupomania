const db = require("../models/");
const Commentaires = db.commentaires;
const Op = db.Sequelize.Op;

exports.createCommentaire = (req, res, next) => {
  const commentaire = {
    message: req.body.message,
    articleId: req.body.articleId,
    userId: req.body.userId,
  };
  Commentaires.create(commentaire)
    .then(commentaire => {
      res.send(commentaire);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du commentaire "
      });
    });

};

exports.modifyCommentaire = (req, res, next) => {
  const id = req.params.id;
  const modification = req.file ? {
    message: req.body.message,
    articleId: req.body.articleId,
    userId: req.body.userId,
  } : {  
    message: req.body.message,
    articleId: req.body.articleId,
    userId: req.body.userId,}
    
  Commentaires.update(modification, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le commentaire est modifié"
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour le commentaire avec l'id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la mise à jour du commentaire avec l'id=" + id
      });
    });
};

exports.deleteCommentaire = (req, res, next) => {
  const id = req.params.id;

  Commentaires.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "commentaire supprimé!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer le commentaire avec l'id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erreur lors de la suppression du commentaire avec l'id=" + id
      });
    });
};

exports.getOneCommentaire = (req, res, next) => {
 const id = req.params.id;
Commentaires.findByPk(id)
 .then(data => {
   res.send(data);
 })
 .catch(err => {
   res.status(500).send({
     message: "Problème de récupération du commentaire avec l'id=" + id
   });
 });
}

exports.findAll = (req, res, next) => {
  Commentaires.findAll({order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erreur lors de la récupération des Commentaires"
      });
    });
};