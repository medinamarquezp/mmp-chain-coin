const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Keypair {
  static generate() {
    return ec.genKeyPair();
  }

  static keyPairFromPrivateKey(privateKey) {
    return ec.keyFromPrivate(privateKey);
  }

  static verifySignature(publicKey, signature, dataHash) {
    return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
  }
}

module.exports = Keypair;
