/** @format */

const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/secrets');

const StudentModel = require('../../../models/Student');

// {
//     email,password
// }

exports.studentLogin = (req, res) => {
  const errors = {};

  StudentModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        errors.msg = 'Not found';

        res.status(404).json(errors);
      }

      const typeNum = Math.floor(100000 + Math.random() * 900000);

      let ans = typeNum.toString() + user.userType;

      if (user.password === req.body.password) {
        const payLoad = {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          type: ans,
          phone: user.phone,
        };

        jwt.sign(payLoad, secret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        errors.msg = 'Incorrect password';
        return res.status(404).json(errors);
      }
    })
    .catch((e) => {
      errors.msg = 'No User found';
      errors.error = e;
      res.status(404).json(errors);
    });
};
