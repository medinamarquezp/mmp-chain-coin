const { check } = require("express-validator");

const newTransactionValidationRules = () => {
  return [
    check("recipient").notEmpty().withMessage("Recipient public key required"),
    check("amount")
      .notEmpty()
      .withMessage("Amount required")
      .isFloat()
      .withMessage("Amount must be a float value"),
  ];
};

module.exports = newTransactionValidationRules;
