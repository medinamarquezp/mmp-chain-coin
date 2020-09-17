const Uuid = require("@services/Uuid");
const Hash = require("@services/Hash");
const Keypair = require("@services/Keypair");

class Transaction {
  constructor() {
    this.id = Uuid.generate();
    this.input = null;
    this.outputs = [];
  }

  updateTransaction(senderWallet, recipientWallet, amount) {
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.publicKey
    );
    Transaction.checkSenderFunds(amount, senderWallet);
    senderOutput.amount = senderOutput.amount - amount;
    this.outputs.push({ amount, address: recipientWallet });
    Transaction.signTransaction(this, senderWallet);
  }

  static newTransaction(senderWallet, recipientWallet, amount) {
    const transaction = new this();
    Transaction.checkSenderFunds(amount, senderWallet);
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

  static checkSenderFunds(amount, senderWallet) {
    if (amount > senderWallet.balance)
      throw new Error(`Insufficient funds to transfer '${amount}' tokens`);
  }

  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(Hash.sha256(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return Keypair.verifySignature(
      transaction.input.address,
      transaction.input.signature,
      Hash.sha256(transaction.outputs)
    );
  }
}

module.exports = Transaction;
