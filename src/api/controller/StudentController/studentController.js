/** @format */

const jwt = require("jsonwebtoken");
const secret = "sabkaBaapHaIyeSoftware";

const StudentModel = require("../../../models/Student");

const csv = require("csv-parser");
const fs = require("fs");

exports.studentCSVUpload = (req, res) => {
  let tempArray = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      tempArray.push(row);
    })
    .on("end", () => {
      StudentModel.insertMany(tempArray, (err, data) => {
        if (data) {
          res.status(200).json({
            msg: "Csv upload completed",
          });
        }
      });
    });
};
// {
//     username,name,email,password, phone
// }

exports.studentRegister = (req, res) => {
  const errors = {};

  StudentModel.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.msg = "User exists!";
        res.status(400).json(errors);
      } else {
        const newStudent = new StudentModel({
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: 3,
          phone: req.body.phone,
          isDeleted: false,
        });

        newStudent
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
      }
    })
    .catch((e) => {
      errors.error = e;
      res.status(400).json(errors);
    });
};

// {
//     email,password
// }

exports.studentLogin = (req, res) => {
  const errors = {};

  StudentModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        errors.msg = "Not found";

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
        errors.msg = "Incorrect password";
        return res.status(404).json(errors);
      }
    })
    .catch((e) => {
      errors.msg = "No User found";
      errors.error = e;
      res.status(404).json(errors);
    });
};
