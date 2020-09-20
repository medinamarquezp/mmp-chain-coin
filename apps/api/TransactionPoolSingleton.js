const TransactionPool = require("@entities/TransactionPool");

class TransactionPoolSingleton {
  static instance = null;
  static getInstance() {
    if (this.instance === null) {
      this.instance = new TransactionPool();
      return this.instance;
    }
    return this.instance;
  }
}

module.exports = TransactionPoolSingleton;
