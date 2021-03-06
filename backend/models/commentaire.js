module.exports = (sequelize, Sequelize, user, article) => {
  const Commentaires =  sequelize.define('commentaire', {
     'message': {
       type: Sequelize.STRING,
       allowNull: false,
       required: true
     },
     'image': {
       type: Sequelize.STRING,
       allowNull: false,
       required: true
     },
     'articleId': {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      requierd: true
      },
     'userId': {
       type: Sequelize.INTEGER(11),
       allowNull: false,
       requierd: true
     },
     'createdAt': {
       allowNull: false,
       type: Sequelize.DATE,
       defaultValue: Sequelize.NOW,
     },
    'updatedAt': {
       allowNull: false,
       type: Sequelize.DATE,
       defaultValue: Sequelize.NOW,
     },
 
   }, {
     tableName: 'Commentaires',
     freezeTableName: true
   });
   Commentaires.belongsTo(user, { foreignKey: 'userId', onDelete:'cascade' });
   Commentaires.belongsTo(article, { foreignKey: 'articleId', onDelete:'cascade' });
   return Commentaires
 };