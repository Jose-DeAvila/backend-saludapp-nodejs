const express = require("express");
const bodyParser = require("body-parser");
const StaticsRouter = require("./routes/static");
const AuthRouter = require("./routes/auth");
const tokenRouter = require("./middlewares/tokenVerify");
const functionalRouter = require("./routes/functional");

require("./db");
const app = express();
const PORT = process.env.PORT || 5000;

const apiVersion = '/api/v1';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.use(`${apiVersion}/static/`, StaticsRouter);
app.use(`${apiVersion}/auth/`, AuthRouter);
app.use(`${apiVersion}/functional/`, tokenRouter, functionalRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
