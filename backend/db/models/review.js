'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.hasMany(
        models.Image,
        {
          foreignKey:'imageableId',
          constraints: false,
          scope: {
            imageableType: 'review'
          }
        }
      )

      Review.belongsTo(
        models.User,
        {
          foreignKey:'userId',
          onDelete: 'cascade',
        }
      )

      Review.belongsTo(
        models.Spot,
        {
          foreignKey: 'spotId',
          onDelete: 'cascade',
        }
      )
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
        max: 5
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
