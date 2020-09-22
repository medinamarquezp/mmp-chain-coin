const Transaction = require("@entities/Transaction");

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    const transactionFound = this.findTransactionById(transaction.id);
    if (transactionFound) {
      const transacionPosition = this.transactions.indexOf(transactionFound);
      this.transactions[transacionPosition] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  findTransactionById(id) {
    return this.transactions.find((t) => t.id === id);
  }

  findTransactionByAddress(address) {
    return this.transactions.find((t) => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter((transaction) => {
      const outputTotal = transaction.outputs.reduce((total, output) => {
        return total + output.amount;
      }, 0);
      if (transaction.input.amount != outputTotal) {
        console.error(`Invalid transaction from ${transaction.input.address}`);
        return;
      }
      if (!Transaction.verifyTransaction(transaction)) {
        console.error(`Invalid signature from ${transaction.input.address}`);
        return;
      }
      return transaction;
    });
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;
