const KeyPair = require("@services/Keypair");
const { INITIAL_BALANCE } = require("@config");

class Wallet {
  constructor(balance) {
    this.balance = balance ? balance : INITIAL_BALANCE;
    this.keyPair = KeyPair.generate();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  toString() {
    `WALLET:
     Public key: ${this.publicKey}
     Balance: ${this.balance}
    `;
  }
}

module.exports = Wallet;
