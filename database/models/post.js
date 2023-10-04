import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'authorId',
        as: 'user',
      });
      Post.belongsToMany(models.Tag, {
        through: 'TagPost',
      });
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      info: DataTypes.TEXT,
      autorId: DataTypes.INTEGER,
      imagePath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Post',
    },
  );
  return Post;
};
