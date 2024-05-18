const mongoose = require("mongoose");

  const connectToDb = async (url) => {
    try {
      let connection = await mongoose.connect(url);
      if (connection){
        console.log("Connected to mongodb database successfully")
      }
    } catch (error) {
      console.log(error);
    }
  };
module.exports = connectToDb;