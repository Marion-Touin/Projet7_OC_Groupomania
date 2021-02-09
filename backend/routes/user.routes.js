module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new users
    router.post("/register", users.create);

    //login users
    router.post('/login', users.login);
  
    app.use('/api/user', router);
  };