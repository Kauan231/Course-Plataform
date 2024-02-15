'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.associate = models => {
        /*
        Course.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'Users'
        } )
        */
       Course.belongsToMany(models.User, {
        through: 'Course_Enrolls',
       })
      }
    }
  }
  Course.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    categories: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};