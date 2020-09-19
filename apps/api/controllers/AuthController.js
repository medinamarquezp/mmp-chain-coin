const { validationResult } = require("express-validator");
const InMemoryUserRepository = require("@repositories/InMemoryUserRepository");
const ResponseHandler = require("@handlers/ResponseHandler");
const Exception = require("@exceptions/Exception");

class AuthController {
  static repo = new InMemoryUserRepository();

  static signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Exception(422, errors.array());
    }
    const { username, email, password } = req.body;
    let createdUser;
    try {
      createdUser = AuthController.repo.createUser(username, email, password);
    } catch (err) {
      throw new Exception(400, err.message);
    }
    ResponseHandler.response(res, createdUser);
  }
}

module.exports = AuthController;
