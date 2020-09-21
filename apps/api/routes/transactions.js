const express = require("express");
const router = express.Router();

const TransactionsController = require("@controllers/TransactionsController");

router.get("/", TransactionsController.getTransactions);

module.exports = router;
