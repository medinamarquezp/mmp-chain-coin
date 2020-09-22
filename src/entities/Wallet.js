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
    this.privateKey = this.keyPair.getPrivate("hex");
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
    let transaction = pool.findTransactionByAddress(this.publicKey);
    if (transaction) {
      this.checkFunds(amount, transaction);
      transaction.updateTransaction(this, recipient, amount);
    } else {
      Transaction.checkSenderFunds(amount, this);
      transaction = Transaction.newTransaction(this, recipient, amount);
      pool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }

  checkFunds(amount, transaction) {
    const outputsAmount = transaction.outputs[0].amount;
    if (amount > outputsAmount)
      throw new Error(`Insufficient funds to transfer '${amount}' tokens`);
  }

  static blockChainWallet() {
    const blockChainWallet = new this();
    blockChainWallet.address = "Coinbase 000000XXXXX";
    return blockChainWallet;
  }
}

module.exports = Wallet;
