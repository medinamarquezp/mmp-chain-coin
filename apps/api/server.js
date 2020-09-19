const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.HTTP_PORT || 3000;
const P2PServerSingleton = require("@api/P2PServerSingleton");
const authRoutes = require("@routes/auth");
const blockChainRoutes = require("@routes/blockchain");
const Exception = require("@exceptions/Exception");
const ErrorHandler = require("@handlers/ErrorHandler");

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/blockchain", blockChainRoutes);

app.use("*", (req, res, next) => {
  throw new Exception(404, "Not found");
});

app.use((err, req, res, next) => {
  ErrorHandler.response(err, res);
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

const p2pServerInstance = P2PServerSingleton.getInstance();
p2pServerInstance.listen();
