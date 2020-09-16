const KeyPair = require("@services/Keypair");
const { INITIAL_BALANCE } = require("@config");
const Transaction = require("@entities/Transaction");

class Wallet {
  constructor(balance) {
    this.balance = balance ? balance : INITIAL_BALANCE;
    this.keyPair = KeyPair.generate();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, pool) {
    if (amount > this.balance)
      throw new Error(`Insufficient funds to transfer '${amount}' tokens`);
    let transaction = pool.findTransactionByAddress(this.publicKey);
    if (transaction) {
      transaction.updateTransaction(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      pool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }

  toString() {
    `WALLET:
     Public key: ${this.publicKey}
     Balance: ${this.balance}
    `;
  }
}

module.exports = Wallet;
