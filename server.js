const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_URL } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log("Database connect successfully");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
