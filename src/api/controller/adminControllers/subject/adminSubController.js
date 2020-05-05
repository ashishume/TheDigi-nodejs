/** @format */

const Subject = require('../../../../models/Subject');

//subject post route
// {
//   subjectName
// }

exports.adminSubCreate = (req, res) => {
  const errors = {};

  Subject.findOne({ subjectName: req.body.subjectName })
    .then((sub) => {
      if (sub) {
        errors.subjectName = 'Subject Already Exists!';
        res.status(400).json(errors);
      } else {
        const newSub = new Subject({
          subjectName: req.body.subjectName,
        });

        console.log(newSub);
        newSub
          .save()
          .then((doc, err) => {
            if (err) {
              res.status(400).json({
                error: e,
              });
            } else {
              res.status(200).json({
                subjectName: doc.subjectName,
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
      errors.error = 'Something went wrong';
      res.status(400).json(errors);
    });
};

//subject get route

exports.adminSubAccess = (req, res) => {
  const errors = {};

  Subject.find({}, { __v: 0 })
    .then((sub) => {
      if (sub.length == 0) {
        errors.subjectName = 'Subjects Not found';
        res.status(204).json(errors);
      }

      res.status(200).json(sub);
    })
    .catch((e) => {
      errors.error = e;
      errors.error = 'Something went wrong';
      res.status(400).json(errors);
    });
};
