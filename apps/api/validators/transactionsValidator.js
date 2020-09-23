const { check } = require("express-validator");

const mineTransactionsValidationRules = () => {
  return [
    check("walletPublicKey")
      .notEmpty()
      .withMessage("Wallet public key required"),
  ];
};

module.exports = mineTransactionsValidationRules;
