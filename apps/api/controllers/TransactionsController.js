const Miner = require("@entities/Miner");
const userRepo = require("@memorepos/userRepo");
const P2PServerSingleton = require("@api/P2PServerSingleton");
const BlockChainSingleton = require("@api/BlockChainSingleton");
const TransactionPoolSingleton = require("@api/TransactionPoolSingleton");
const Exception = require("@exceptions/Exception");
const { validationResult } = require("express-validator");
const ResponseHandler = require("@handlers/ResponseHandler");
class TransactionsController {
  static p2pServer = P2PServerSingleton.getInstance();
  static blockChain = BlockChainSingleton.getInstance();
  static transactionPool = TransactionPoolSingleton.getInstance();

  static getTransactions(req, res, next) {
    try {
      const transactions = TransactionsController.transactionPool.transactions;
      ResponseHandler.response(res, transactions);
    } catch (error) {
      return next(
        new Exception(400, `Error on retrieving transactions: ${error}`)
      );
    }
  }
  static mineTransactions(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(422, errors.array()));
    }
    try {
      const { walletPublicKey } = req.body;
      const miner = new Miner(
        TransactionsController.blockChain,
        TransactionsController.transactionPool,
        walletPublicKey,
        TransactionsController.p2pServer
      );
      const minedBlock = miner.mine();
      TransactionsController.payReward(minedBlock);
      TransactionsController.processTransactions(minedBlock);
      ResponseHandler.response(res, minedBlock);
    } catch (error) {
      return next(new Exception(400, `Error on mining transactions: ${error}`));
    }
  }

  static payReward(minedBlock) {
    const rewardTransaction = Miner.rewardTransaction(minedBlock);
    userRepo.updateWalletBalance(
      rewardTransaction.address,
      rewardTransaction.amount
    );
  }

  static processTransactions(minedBlock) {
    const transactionList = Miner.transactionList(minedBlock);
    transactionList.forEach((transaction) => {
      userRepo.updateWalletBalance(
        transaction.address,
        transaction.amount,
        transaction.action
      );
    });
  }
}

module.exports = TransactionsController;
