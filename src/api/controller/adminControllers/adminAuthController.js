const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('secret');
const passport = require('passport');

exports.adminRegister = (req, res) => {
  //   const { errors, isValid } = validationRegisterInput(req.body, 'signup');

  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }

  User.findOne({ phone: req.body.phone })
    .then((user) => {
      if (user) {
        errors.phone = 'Phone number exists';
        res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          phone: req.body.phone,
          password: req.body.password,
        });

        bcryptjs.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcryptjs.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((doc, err) => {
                if (err) {
                  res.status(400).json({
                    error: e,
                  });
                } else {
                  res.status(200).json({
                    phone: doc.phone,
                    name: doc.name,
                  });
                }
              })
              .catch((e) => {
                res.status(400).json({
                  error: e,
                });
              });
          });
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
