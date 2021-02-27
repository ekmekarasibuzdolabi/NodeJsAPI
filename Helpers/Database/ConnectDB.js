const mongoose = require("mongoose");

const connectDatabase = () => {
  // MongoDb 'ye bağlantımızı gerçekleştiriyoruz.
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((response) => console.log("MONGODB CONNECTION SUCCESSFULL"))
    .catch((err) => console.log(err));
};
module.exports = connectDatabase;
