const express = require('express');
const router = express.Router();
const User = require('../../../models/adminModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = 'sabkaBaapHaIyeSoftware';

const validateLogin = require('../../../validations/loginValidations');
const validateRegister = require('../../../validations/registerValidations');

exports.adminRegister = (req, res) => {
  const { errors, isValid } = validateRegister(req.body, 'signup');

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'Email exists';
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          type: req.body.type,
        });

        console.log(newUser);

        newUser
          .save()
          .then((doc, err) => {
            if (err) {
              res.status(400).json({
                error: e,
              });
            } else {
              res.status(200).json({
                email: doc.email,
                name: doc.name,
              });
            }
          })
          .catch((e) => {
            res.status(400).json({
              error: e,
            });
          });

        // bcryptjs.genSalt(10, (err, salt) => {
        //   if (err) throw err;
        //   bcryptjs.hash(newUser.password, salt, (err, hash) => {
        //     if (err) throw err;
        //     newUser.password = hash;

        //   });
        // });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.adminLogin = (req, res) => {
  const { errors, isValid } = validateLogin(req.body, 'login');

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = 'Not found';

      res.status(404).json(errors);
    }

    if (user.password === req.body.password) {
      const payLoad = {
        id: user._id,
        email: user.email,
        name: user.name,
      };

      jwt.sign(payLoad, secret, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: `Bearer ${token}`,
        });
      });
    } else {
      errors.password = 'Incorrect password';
      return res.status(404).json(errors);
    }
  });
};
