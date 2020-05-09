/** @format */

const Teacher = require('../../../../models/Teacher');
const StudentModel = require('../../../../models/Student');
const SubjectModel = require('../../../../models/Subject');
const csv = require('csv-parser');
const fs = require('fs');

exports.teacherCSVUpload = (req, res) => {
  let tempArray = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      tempArray.push(row);
    })
    .on('end', () => {
      Teacher.insertMany(tempArray, (err, data) => {
        if (data) {
          res.status(200).json({
            msg: 'Csv upload completed',
          });
        }
      });
    });
};

// {
//     username,name,email,password, phone
// }

exports.teacherRegister = (req, res) => {
  const errors = {};

  Teacher.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.msg = 'User exists!';
        res.status(400).json(errors);
      } else {
        const newTeacher = new Teacher({
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          userType: 2,
          phone: req.body.phone,
          isDeleted: false,
        });

        newTeacher
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
//     teacherID, students:[]
// }

exports.addStudents = (req, res) => {
  const errors = {};

  let incomingStudents = [];

  const studentData = req.body.students;
  console.log(studentData);
  if (studentData.length > 0) {
    studentData.map((stuID) => {
      StudentModel.findById(stuID)
        .then((stu) => {
          if (stu) {
            incomingStudents.unshift(stuID);
          } else {
            errors.msg = `Student id = ${stuId} not found`;
            res.status(400).json(errors);
          }
        })
        .catch((e) => {
          errors.msg = 'Something went wrong';
          errors.error = e;
          res.status(404).json(errors);
        });
    });
  } else {
    errors.msg = 'Students array empty';
    res.status(400).json(errors);
  }

  Teacher.findById(req.body.teacherID)
    .then((teacher) => {
      if (teacher) {
        Teacher.findByIdAndUpdate(
          teacher._id,
          { $addToSet: { students: incomingStudents } },
          { new: true, useFindAndModify: false }
        ).then((teacher) => res.json(teacher));
      } else {
        errors.msg = "Teacher doesn't exist";
        res.status(404).json(errors);
      }
    })
    .catch((e) => {
      errors.msg = 'No teacher found';
      errors.error = e;
      res.status(404).json(errors);
    });
};

// {
//     teacherID, subjects:[]
// }

exports.addSubjects = (req, res) => {
  const errors = {};

  let incomingSubs = [];

  const subjectData = req.body.subjects;
  if (subjectData.length > 0) {
    subjectData.map((subID) => {
      SubjectModel.findById(subID)
        .then((sub) => {
          if (sub) {
            incomingSubs.unshift(subID);
          } else {
            errors.msg = `Subject id = ${stuId} not found`;
            res.status(400).json(errors);
          }
        })
        .catch((e) => {
          errors.msg = 'Something went wrong';
          errors.error = e;
          res.status(404).json(errors);
        });
    });
  } else {
    errors.msg = 'Subjects array empty';
    res.status(400).json(errors);
  }

  Teacher.findById(req.body.teacherID)
    .then((teacher) => {
      if (teacher) {
        Teacher.findByIdAndUpdate(
          teacher._id,
          { $addToSet: { subjects: incomingSubs } },
          { new: true, useFindAndModify: false }
        ).then((teacher) => res.json(teacher));
      } else {
        errors.msg = "Teacher doesn't exist";
        res.status(404).json(errors);
      }
    })
    .catch((e) => {
      errors.msg = 'No teacher found';
      errors.error = e;
      res.status(404).json(errors);
    });
};

exports.allTeachers = (req, res) => {
  Teacher.find({ isDeleted: false }, { __v: 0 })
    .then((teach) => {
      if (teach.length == 0) {
        errors.msg = 'Teachers Not found';
        res.status(204).json(errors);
      }

      res.status(200).json(teach);
    })
    .catch((e) => {
      errors.msg = 'No teacher found';
      errors.error = e;
      res.status(404).json(errors);
    });
};

exports.allStudents = (req, res) => {
  StudentModel.find({ isDeleted: false }, { __v: 0 })
    .then((stu) => {
      if (stu.length == 0) {
        res.status(204).json({
          msg: 'Students Not found',
        });
      }

      res.status(200).json(stu);
    })
    .catch((e) => {
      errors.msg = 'Something went wrong';
      errors.error = e;
      res.status(404).json(errors);
    });
};

exports.teacherById = (req, res) => {
  Teacher.findById(req.body.teacherID)
    .then((teach) => {
      if (!teach) {
        res.status(404).json({
          msg: 'No teacher found',
        });
      } else {
        res.status(200).json(teach);
      }
    })
    .catch((e) => {
      res.status(404).json({
        error: e,
        msg: 'Something went wrong',
      });
    });
};
