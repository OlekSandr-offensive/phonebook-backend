const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { MONGO_URL, PORT = 3000 } = process.env;

mongoose.set("useFindAndModify", false);

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connect successfully");
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
