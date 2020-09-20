const express = require("express");
const router = express.Router();

const newTransactionValidationRules = require("@validators/walletsValidator");

const isLogged = require("@middlewares/isLogged");
const WalletsController = require("@controllers/WalletsController");

router.get("/", isLogged, WalletsController.getWallets);
router.post("/", isLogged, WalletsController.createWallet);
router.post(
  "/:walletId/new-transaction",
  isLogged,
  newTransactionValidationRules(),
  WalletsController.newTransaction
);

module.exports = router;
