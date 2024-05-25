const express = require("express");
const connectToDb = require("./database/db");
const app = express();
const cors = require("cors");
const PORT = 5000 || process.env.HOST;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use("/blog", require("./routes/blogs"));
app.use("/messages", require("./routes/message"));
app.use("/img", express.static("public"));
connectToDb(process.env.DATABASE)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
