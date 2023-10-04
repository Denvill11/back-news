import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TagPost extends Model {
    static associate() {}
  }
  TagPost.init(
    {
      tagId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TagPost',
    },
  );
  return TagPost;
};
