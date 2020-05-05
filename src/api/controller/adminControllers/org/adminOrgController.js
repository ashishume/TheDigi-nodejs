/** @format */

const Org = require('../../../../models/org');

// orgnisation get route

exports.adminOrgAccess = (req, res) => {
  const errors = {};

  Org.find().then((org) => {
    if (org.length == 0) {
      errors.org = 'Organisation Not found';
      res.status(204).json(errors);
    }

    res.status(200).json(org);
  });
};

// orgnisation post route

// {
//   name
// }

exports.adminOrgCreate = (req, res) => {
  const errors = {};

  Org.findOne({ name: req.body.name }).then((org) => {
    if (org) {
      errors.org = 'Organisation Name Exists!';
      res.status(400).json(errors);
    } else {
      const newOrg = new Org({
        name: req.body.name,
      });

      newOrg
        .save()
        .then((doc, err) => {
          if (err) {
            res.status(400).json({
              error: e,
            });
          } else {
            res.status(200).json({
              name: doc.name,
            });
          }
        })
        .catch((e) => {
          errors.error = e;
          errors.error = 'Something went wrong';
          res.status(400).json(errors);
        });
    }
  });
};
