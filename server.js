const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { MONGO_URL, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connect successfully");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
