module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    // Create a new users
    router.post("/register", users.create);

    //login users
    router.post('/login', users.login);
  
  /*  // Retrieve all posts
    router.get("/", posts.findAll);
  
    // Retrieve all published posts
    router.get("/published", posts.findAllPublished);
  
    // Retrieve a single post with id
    router.get("/:id", posts.findOne);
  
    // Update a post with id
    router.put("/:id", posts.update);
  
    // Delete a post with id
    router.delete("/:id", posts.delete);
  
    // Delete all posts
    router.delete("/", posts.deleteAll);*/
  
    app.use('/api/user', router);
  };