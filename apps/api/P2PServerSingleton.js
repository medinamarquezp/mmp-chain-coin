const BlockChainSingleton = require("@api/BlockChainSingleton");
const P2PServer = require("@p2p/P2PServer");

class P2PServerSingleton {
  static instance = null;
  static getInstance() {
    if (this.instance === null) {
      this.instance = new P2PServer(BlockChainSingleton.getInstance());
      return this.instance;
    }
    return this.instance;
  }
}

module.exports = P2PServerSingleton;
