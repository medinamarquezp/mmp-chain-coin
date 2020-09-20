const { check } = require("express-validator");

const newTransactionValidationRules = () => {
  return [
    check("recipient").notEmpty().withMessage("Recipient public key required"),
    check("amount")
      .notEmpty()
      .withMessage("Amount required")
      .isInt()
      .withMessage("Amount must be a number"),
  ];
};

module.exports = newTransactionValidationRules;
