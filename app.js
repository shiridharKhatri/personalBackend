const express = require("express");
const connectToDb = require("./database/db");
const app = express();
const cors = require("cors");
const PORT = 5000 || process.env.HOST;

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/blog", require("./routes/blogs"));
app.use("/img", express.static("./images"));
connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
