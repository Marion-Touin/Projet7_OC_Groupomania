module.exports = app => {
    const multer = require('../middleware/multer-config');
    var router = require("express").Router();
    const commentaires = require("../controllers/com.js");

    const auth = require('../middleware/auth');

    //post un commentaire
    router.post('/', auth, multer, commentaires.createCommentaire)
    //modifier un Commentaire
    router.put('/:id', auth, multer,commentaires.modifyCommentaire);
    //supprimer la route
    router.delete('/:id', auth,commentaires.deleteCommentaire);
    //route pour un Commentaire en fonction d'orderId
    router.get('/:id', auth,commentaires.getOneCommentaire)
    // route pour tout les commentaires
    router.get('/', auth, commentaires.findAll);

   app.use('/api/commentaires', router)
}