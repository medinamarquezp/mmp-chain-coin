const { check } = require("express-validator");

const signUpValidationRules = () => {
  return [
    check("username").notEmpty().withMessage("Username required"),
    check("email")
      .notEmpty()
      .withMessage("Email required")
      .isEmail()
      .withMessage("Wrong email format"),
    check("password")
      .notEmpty()
      .withMessage("Password required")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/)
      .withMessage(
        "Password must have at least 8 characters, letters upper and lower case and numbers"
      ),
  ];
};

const signInValidationRules = () => {
  return [
    check("email")
      .notEmpty()
      .withMessage("Email required")
      .isEmail()
      .withMessage("Wrong email format"),
    check("password")
      .notEmpty()
      .withMessage("Password required")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/)
      .withMessage(
        "Password must have at least 8 characters, letters upper and lower case and numbers"
      ),
  ];
};

module.exports = {
  signUpValidationRules,
  signInValidationRules,
};
