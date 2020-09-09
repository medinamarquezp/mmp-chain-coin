const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;

const appRoutes = require("@routes/api");

app.use(bodyParser.json());
app.use("/api", appRoutes);

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
