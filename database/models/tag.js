import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Post, {
        through: 'TagPost',
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
    },
  );
  return Tag;
};
