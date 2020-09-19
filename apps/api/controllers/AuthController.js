const Exception = require("@exceptions/Exception");
const { validationResult } = require("express-validator");
const ResponseHandler = require("@handlers/ResponseHandler");
const InMemoryUserRepository = require("@repositories/InMemoryUserRepository");

class AuthController {
  static repo = new InMemoryUserRepository();

  static async signUp(req, res, next) {
    AuthController.validateRequest(req);
    const { username, email, password } = req.body;
    let createdUser;
    try {
      createdUser = await AuthController.repo.createUser(
        username,
        email,
        password
      );
    } catch (error) {
      AuthController.catchError(error);
    }
    ResponseHandler.response(res, createdUser);
  }

  static catchError(error) {
    const err = new Exception(400, error.message);
    return next(err);
  }

  static validateRequest(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Exception(422, errors.array());
      return next(err);
    }
  }
}

module.exports = AuthController;
