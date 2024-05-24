const { body } = require('express-validator');
const db = require('../../models'); // Assuming models directory is at the same level

// Validation rules for creating a user
const CreateUserValidationRules = [
  body('firstName').notEmpty().trim().withMessage('Name is required'),
  body('lastName').notEmpty().trim().withMessage('Name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email format')
    .custom(async (value, { req }) => {
      const existingUser = await db.User.findOne({
        where: {
          email: value,
        },
      });
      if (existingUser) {
        throw new Error('Email address already in use');
      }
      return true; // Resolve the custom validation
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

// Validation rules for creating a user
const UpdateUserValidationRules = [
  body('firstName').notEmpty().trim().withMessage('First name is required'),
  body('lastName').notEmpty().trim().withMessage('Last name is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email format')
    .custom(async (value, { req }) => {
      const existingUser = await db.User.findOne({
        where: {
          email: value,
          id: {
            [db.Sequelize.Op.ne]: req.params.id, // Use the ne (not equal) operator
          },
        },
      });
      if (existingUser) {
        throw new Error('Email address already in use');
      }
      return true; // Resolve the custom validation
    }),
  body('oldPassword')
    .optional({ checkFalsy: true }) // Optional but required if password or rePassword is present
    .isLength({ min: 8 })
    .withMessage('Old password must be at least 8 characters long'),
  body('password')
    .optional({ checkFalsy: true }) // Optional but required if oldPassword is present
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .custom((value, { req }) => {
      // oldPassword is required for New password
      if (value && req.body.oldPassword == '') {
        throw new Error('Old password is required to update password');
      }
      // Entered the same Password you Enterd into Old Password Field
      if (value == req.body.oldPassword) {
        throw new Error(
          'Entered the same Password you Enterd into Old Password Field',
        );
      }

      return true;
    }),
  body('rePassword')
    .optional({ checkFalsy: true }) // Optional but required if password is present
    .custom((value, { req }) => {
      // Custom validation for matching password and rePassword
      if (req.body.password && value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    }),
];

module.exports = { CreateUserValidationRules, UpdateUserValidationRules };
