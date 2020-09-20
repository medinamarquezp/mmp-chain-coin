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
}

module.exports = TransactionPool;
