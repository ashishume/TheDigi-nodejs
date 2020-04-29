const mongoose = require('mongoose');
const axios = require('axios');

const connectDB = () => {
  try {
    axios
      .get(
        'https://raw.githubusercontent.com/sounak07/cReD/master/credentials.json'
      )
      .then((data) => {
        data.data.map((value) => {
          mongoose
            .connect(value.mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            })
            .then((body) => {
              console.log('Mongo Connected...');
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// const connectDB = async () => {
//   try {
//     await mongoose.connect(
//       'mongodb+srv://deathkingume:deathking1997###@cluster0-brfpz.mongodb.net/school-db?retryWrites=true&w=majority',
//       { useNewUrlParser: true }
//     );

//     console.log('Mongo Connected...');
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

module.exports = connectDB;
