module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING(64),
        is: /^[0-9a-f]{64}$/i
      },
      role: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };