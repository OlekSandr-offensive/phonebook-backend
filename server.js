const app = require("./app");
const mongoose = require("mongoose");

const { MONGO_URL } = process.env;
const port = process.env.PORT || 4000;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("Database connect successfully");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
