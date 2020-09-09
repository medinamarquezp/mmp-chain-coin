const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

const appRoutes = require("@routes/api");
const Exception = require("@exceptions/Exception");
const ErrorHandler = require("@handlers/ErrorHandler");

app.use(bodyParser.json());
app.use("/api", appRoutes);

app.use("*", (req, res, next) => {
  throw new Exception(404, "Not found");
});

app.use((err, req, res, next) => {
  ErrorHandler.response(err, res);
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
