'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lesson.associate = models => {
        
        Lesson.belongsTo(models.Course, {
          foreignKey: 'courseid',
          as: 'Courses'
        } )
        
      }
    }
  }
  Lesson.init({
    title: DataTypes.STRING,
    video: DataTypes.STRING,
    description: DataTypes.STRING,
    courseid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};