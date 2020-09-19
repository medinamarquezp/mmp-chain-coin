const { validationResult } = require("express-validator");
const InMemoryUserRepository = require("@repositories/InMemoryUserRepository");
const ResponseHandler = require("@handlers/ResponseHandler");
const Exception = require("@exceptions/Exception");

class AuthController {
  static repo = new InMemoryUserRepository();

  static async signUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Exception(422, errors.array());
      return next(err);
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
      const err = new Exception(400, error.message);
      return next(err);
    }
    ResponseHandler.response(res, createdUser);
  }
}

module.exports = AuthController;
