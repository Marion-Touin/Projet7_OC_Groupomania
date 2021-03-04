const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.articles = require("./article.js")(sequelize, Sequelize);
db.commentaires = require("./commentaire.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

/* // association table articles et users
db.users.hasMany(db.articles, { as: "articles" });
db.articles.belongsTo(db.users, {
  foreignKey: "userId",
  as: "articles",
});

//association table commentaires à users
db.users.hasMany(db.commentaires, { as: "commentaires" });
db.commentaires.belongsTo(db.users, {
  foreignKey: "userId",
  as: "commentaires",
});

//association table commentaire à articles
db.articles.hasMany(db.commentaires, { as: "commentaires" });
db.commentaires.belongsTo(db.articles, {
  foreignKey: "articleId",
  as: "articles",
}); */

module.exports = db;