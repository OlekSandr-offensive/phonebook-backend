const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
  res.header("Access-Control-Allow-Origin", "*");
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
