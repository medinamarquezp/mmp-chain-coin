const userRepo = require("@memorepos/userRepo");
const Exception = require("@exceptions/Exception");
const { validationResult } = require("express-validator");
const ResponseHandler = require("@handlers/ResponseHandler");

class AuthController {
  static repo = userRepo;

  static async signUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(422, errors.array()));
    }
    const { username, email, password } = req.body;
    let createdUser;
    try {
      createdUser = await AuthController.repo.createUser(
        username,
        email,
        password
      );
    } catch (error) {
      return next(new Exception(400, error.message));
    }
    ResponseHandler.response(res, createdUser);
  }

  static async signIn(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(422, errors.array()));
    }
    const { email, password } = req.body;
    let loggedUser;
    try {
      loggedUser = await AuthController.repo.getUserToken(email, password);
    } catch (error) {
      return next(new Exception(400, error.message));
    }
    ResponseHandler.response(res, loggedUser);
  }
}

module.exports = AuthController;
