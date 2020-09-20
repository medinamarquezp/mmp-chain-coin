const userRepo = require("@memorepos/userRepo");
const Exception = require("@exceptions/Exception");
const ResponseHandler = require("@handlers/ResponseHandler");

class WalletsController {
  static repo = userRepo;

  static getWallets(req, res, next) {
    try {
      const userId = req.userId;
      const wallets = WalletsController.repo.getWallets(userId);
      ResponseHandler.response(res, { userId, wallets });
    } catch (error) {
      return next(
        new Exception(400, `Error on getting wallets: ${error.message}`)
      );
    }
  }

  static createWallet(req, res, next) {
    try {
      const userId = req.userId;
      WalletsController.repo.createNewWallet(userId);
      res.redirect("/api/wallets");
    } catch (error) {
      return next(
        new Exception(400, `Error on creating a new wallet: ${error.message}`)
      );
    }
  }
}

module.exports = WalletsController;
