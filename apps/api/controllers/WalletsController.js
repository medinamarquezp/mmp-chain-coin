const userRepo = require("@memorepos/userRepo");
const Exception = require("@exceptions/Exception");
const ResponseHandler = require("@handlers/ResponseHandler");

class WalletsController {
  static repo = userRepo;

  static getWallets(req, res, next) {
    try {
      const userId = req.userId;
      const wallets = WalletsController.repo.getWallets(userId);
      ResponseHandler.response(res, wallets);
    } catch (error) {
      return next(new Exception(400, `Error on getting wallets: ${error}`));
    }
  }
}

module.exports = WalletsController;
