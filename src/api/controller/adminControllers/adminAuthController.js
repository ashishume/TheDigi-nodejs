const express = require('express');
const router = express.Router();
const User = require('../../../models/adminModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.adminRegister = (req, res) => {
  //   const { errors, isValid } = validationRegisterInput(req.body, 'signup');

  const errors = {};

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

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

exports.adminLogin = (req, res) => {};
