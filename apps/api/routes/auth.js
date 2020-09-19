const express = require("express");
const router = express.Router();

const { signUpValidationRules } = require("@validators/authValidator");
const AuthController = require("@controllers/AuthController");

router.post("/signup", signUpValidationRules(), AuthController.signUp);

module.exports = router;
