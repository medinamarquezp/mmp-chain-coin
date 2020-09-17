const { INITIAL_BALANCE } = require("@config");
const Uuid = require("@services/Uuid");
const KeyPair = require("@services/Keypair");
const Transaction = require("@entities/Transaction");

class Wallet {
  constructor() {
    this.id = Uuid.generate();
    this.balance = INITIAL_BALANCE;
    this.keyPair = KeyPair.generate();
    this.publicKey = this.keyPair.getPublic("hex");
  }

  get privateKey() {
    return this.keyPair.getPrivate("hex");
  }

  getWalletData() {
    return {
      id: this.id,
      publicKey: this.publicKey,
      privateKey: this.privateKey,
      balance: this.balance,
    };
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
}

module.exports = Wallet;
