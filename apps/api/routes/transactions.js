const express = require("express");
const router = express.Router();

const mineTransactionsValidationRules = require("@validators/transactionsValidator");
const TransactionsController = require("@controllers/TransactionsController");

router.get("/", TransactionsController.getTransactions);
router.post(
  "/mine",
  mineTransactionsValidationRules(),
  TransactionsController.mineTransactions
);

module.exports = router;
