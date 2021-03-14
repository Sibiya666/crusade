const { body } = require('express-validator');
const Inquisitor = require('../models/inquisitor');

exports.registrationValidators = [
  body('login', 'is not correct login').isLength({min: 3, max: 32}),
  body('name', 'is not correct name').isLength({min: 3, max: 32}),
  body('password', 'is not correct password').isLength({min: 8, max: 32}),
  body('email')
    .isEmail()
    .withMessage('is not correct email')
    .custom(async (value) => {
      try {
        if (await Inquisitor.findOne({ email: value })) {
          return Promise.reject('This inquisitor exist');
        }
      } catch (e) {
        throw new Error(e);
      }
    })
    .normalizeEmail(),
  body('repeatPassword')
    .custom((value, { req }) => {
      
      if (value !== req.body.repeatPassword) {
        throw new Error('Password do not match');
      }

      return true;
    })
    .trim(),
];

exports.authValidators = [
  body('login').custom(async (login) => {
    try {
      const candidate = await Inquisitor.findOne({ login });

      if (!candidate) {
        return Promise.reject('User is not found')
      }

    } catch(e) {
      throw new Error(e)
    }
    
  }),
];
