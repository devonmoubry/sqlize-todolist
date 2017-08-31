'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todos = sequelize.define('Todos', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: DataTypes.TEXT,
    completed: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todos;
};
