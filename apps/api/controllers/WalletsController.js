const userRepo = require("@memorepos/userRepo");
const Exception = require("@exceptions/Exception");
const ResponseHandler = require("@handlers/ResponseHandler");
const TransactionPoolSingleton = require("@api/TransactionPoolSingleton");
const { validationResult } = require("express-validator");

class WalletsController {
  static repo = userRepo;
  static pool = TransactionPoolSingleton.getInstance();

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

  static newTransaction(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(422, errors.array()));
    }
    try {
      const userId = req.userId;
      const walletId = req.params.walletId;
      const { recipient, amount } = req.body;
      const wallet = WalletsController.repo.getWallet(userId, walletId);
      const transaction = wallet.createTransaction(
        recipient,
        amount,
        WalletsController.pool
      );
      ResponseHandler.response(res, transaction);
    } catch (error) {
      return next(
        new Exception(400, `Error making a transaction: ${error.message}`)
      );
    }
  }
}

module.exports = WalletsController;
