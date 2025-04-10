module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        unique: true,
        type: Sequelize.STRING,
      },
      login: {
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        type: Sequelize.STRING,
      },
      avatarPath: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
