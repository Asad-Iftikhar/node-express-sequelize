'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Overwrite toJSON Method to Remove Password
    toJSON() {
      const userObject = { ...this.dataValues };
      // Remove password
      delete userObject.password;
      delete userObject.passwordSalt;
      return userObject;
    }

    // Check Password
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      passwordSalt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeSave: async (user, options) => {
          if (user.password) {
            if (!user.passwordSalt) {
              // Generate salt only if not provided
              const saltRounds = 10; // Adjust salt rounds as needed
              user.passwordSalt = await bcrypt.genSalt(saltRounds); // generate Salt
            }
            user.password = await bcrypt.hash(user.password, user.passwordSalt);
          }
        },
      },
    },
  );

  return User;
};
