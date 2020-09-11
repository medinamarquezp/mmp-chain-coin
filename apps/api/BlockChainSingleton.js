const BlockChain = require("@entities/blockchain");

class BlockChainSingleton {
  static instance = null;
  static getInstance() {
    if (this.instance === null) {
      this.instance = new BlockChain();
      return this.instance;
    }
    return this.instance;
  }
}

module.exports = BlockChainSingleton;
