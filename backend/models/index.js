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

db.users = require("./user.model.js")(sequelize, Sequelize);
db.articles = require("./article.js")(sequelize, Sequelize, db.users);
db.commentaires = require("./commentaire.js")(sequelize, Sequelize, db.users, db.articles);


/* // association table articles et users
db.user.hasMany(db.article, { as: "article" });
db.article.belongsTo(db.user, {
  foreignKey: "userId",
  as: "articles",
});

//association table commentaires à users
db.user.hasMany(db.commentaire, { as: "commentaire" });
db.commentaire.belongsTo(db.user, {
  foreignKey: "userId",
  as: "commentaires",
});

//association table commentaire à articles
db.article.hasMany(db.commentaire, { as: "commentaire" });
db.commentaire.belongsTo(db.article, {
  foreignKey: "articleId",
  as: "articles",
}); */

module.exports = db;