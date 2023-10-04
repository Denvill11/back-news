import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'authorId',
        as: 'posts',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      avatarPath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  User.beforeSave((user) => {
    if (user.changed('password')) {
      user.password = bcrypt.hash(user.password, process.env.SALT);
    }
  });
  return User;
};
