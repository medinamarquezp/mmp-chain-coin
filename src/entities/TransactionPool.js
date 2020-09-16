class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    const transactionFound = this.existsTransaction(transaction);
    if (transactionFound) {
      const transacionPosition = this.transactions.indexOf(transactionFound);
      this.transactions[transacionPosition] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  existsTransaction(transaction) {
    return this.transactions.find((t) => t.id === transaction.id);
  }
}

module.exports = TransactionPool;
