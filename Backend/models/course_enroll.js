'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Enroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course_Enroll.init({
    userid: DataTypes.INTEGER,
    courseid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course_Enroll',
  });
  return Course_Enroll;
};