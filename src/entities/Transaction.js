const Uuid = require("@services/Uuid");
const Hash = require("@services/Hash");
const Keypair = require("@services/Keypair");

class Transaction {
  constructor() {
    this.id = Uuid.generate();
    this.input = null;
    this.outputs = [];
  }
  static newTransaction(senderWallet, recipientWallet, amount) {
    const transaction = new this();
    if (amount > senderWallet.balance)
      throw new Error(`Insufficient funds to transfer '${amount}' tokens`);
    transaction.outputs.push(
      ...[
        {
          amount: senderWallet.balance - amount,
          address: senderWallet.publicKey,
        },
        { amount, address: recipientWallet },
      ]
    );
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(Hash.create(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return Keypair.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      Hash.create(transaction.outputs)
    );
  }
}

module.exports = Transaction;
