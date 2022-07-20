const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({min: 2})
    .withMessage('Please provide your first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({min: 2})
    .withMessage('Please provide your last name.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, email, password });

    await setTokenCookie(res, user);

    return res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "token": ""
    });
  }
);

module.exports = router;
