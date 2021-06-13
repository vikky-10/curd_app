const mongoose = require("mongoose");

const connectDB = async function () {
  try {
    //mongodb connection string

    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Mongodb connection:${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.export(T);
  }
};

module.exports = connectDB;
