module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        unique: true,
        is: /^[0-9a-f]{64}$/i
      },
      email: {
        type: Sequelize.STRING,
        is: /^[0-9a-f]{64}$/i,
        isEmail: true,
        unique: true
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