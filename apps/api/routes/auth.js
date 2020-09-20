const express = require("express");
const router = express.Router();

const {
  signUpValidationRules,
  signInValidationRules,
} = require("@validators/authValidator");

const AuthController = require("@controllers/AuthController");

router.post("/signup", signUpValidationRules(), AuthController.signUp);
router.post("/signin", signInValidationRules(), AuthController.signIn);

module.exports = router;
