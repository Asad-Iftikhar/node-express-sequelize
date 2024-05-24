const db = require('../models'); // Assuming models directory is at the same level
const { body, validationResult } = require('express-validator');

// const {
//   BadRequestError,
//   UnauthorizedError,
//   ValidationError,
// } = require('../utils/ApiError');

class UserController {
  // Function to Create a New User
  static createUser = async (req, res, next) => {
    try {
      // Validate request body
      const validate = validationResult(req);
      if (!validate.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation error!', errors: validate.array() });
      }

      const { email } = req.body;

      const userExists = await db.User.findOne({
        where: { email },
      });

      // if (userExists) throw new BadRequestError();
      if (userExists)
        res.status(400).json({
          message: 'User Already Exists!',
          errors: { email: email + ' is already taken.' },
        });

      try {
        // Create a new user with sanitized and validated data
        const newUser = await db.User.create({
          firstName: req.body.firstName.trim(),
          lastName: req.body.lastName.trim(),
          email: req.body.email.toLowerCase(), // Sanitize email to lowercase
          password: req.body.password, // Hash password before saving (refer to security practices)
        });

        res.status(201).json({
          message: 'User created successfully!',
          data: newUser.toJSON(),
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' });
      // next(error);
    }
  };

  // Function to List Users
  static getUsers = async (req, res, next) => {
    try {
      // Fetch All Users except password attribute
      const users = await db.User.findAll({
        attributes: { exclude: ['password', 'passwordSalt'] },
      });

      return res.json({ message: 'Users Fetched!', data: users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Function to Get User By Id
  static getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
      // Fetch User By Its Primarykey
      const user = await db.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({ message: 'User Fetched!', data: user.toJSON() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Function to Update User
  static updateUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
      // First Check User Exists or Not
      const user = await db.User.findByPk(userId); // Assuming a User model or similar exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Validate request body
      const validate = validationResult(req);
      if (!validate.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation error!', errors: validate.array() });
      }

      const { firstName, lastName, email, oldPassword, password } = req.body;
      const updatedUser = {
        firstName,
        lastName,
        email,
      };

      // validate old password
      if (oldPassword && user.checkPassword(oldPassword)) {
        updatedUser.password = password;
      } else if (oldPassword) {
        return res.status(401).json({
          message: 'Incorrect old password',
          errors: {
            oldPassword: 'Incorrect Old Password!',
          },
        });
      }

      const newUser = await user.update(updatedUser, { where: { id: userId } });

      return res.json({ message: 'User Updated!', data: newUser.toJSON() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Testing Method
  static test = async (req, res, next) => {
    try {
      // Fetch User By Its Primarykey
      const email = 'asad1@gmail.com';
      const userId = 1;

      const existingUser = await db.User.findOne({
        where: {
          email,
          id: { [db.Sequelize.Op.ne]: userId },
        },
      });

      return res.json({ message: 'Users Fetched!', data: existingUser });
    } catch (error) {
      throw error;
    }
  };

  // Add functions for other user operations (get all users, get a user by ID, update user, etc.)
}

module.exports = UserController;
