const TransactionPoolSingleton = require("@api/TransactionPoolSingleton");
const Exception = require("@exceptions/Exception");
const ResponseHandler = require("@handlers/ResponseHandler");
class TransactionsController {
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
}

module.exports = TransactionsController;
