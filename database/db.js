const mongoose = require("mongoose");
const url =
  "mongodb+srv://shiridharkhatri2:oe4fnX8sAcTKojbI@portfolio.q38cuu8.mongodb.net/Blogs";

  const connectToDb = async () => {
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