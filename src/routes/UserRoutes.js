const express = require('express');
const UserController = require('../controllers/UserController');
const {
  CreateUserValidationRules,
  UpdateUserValidationRules,
} = require('../validations/user/UserValidations'); // Assuming validation folder is at the same level
const router = express.Router();

router.post('/', CreateUserValidationRules, UserController.createUser);
router.get('/', UserController.getUsers);
// router.get('/:id', UserController.getUserById);
router.patch('/:id', UpdateUserValidationRules, UserController.updateUser);

router.get('/test', UserController.test);

// Add routes for other user operations

module.exports = router;
