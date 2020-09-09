const BlockChain = require("@entities/blockchain");

class InMemoryBlockChainRepo {
  static bc = new BlockChain();

  static getAllBlocks() {
    return InMemoryBlockChainRepo.bc.Chain;
  }

  static mineBlock(data) {
    return InMemoryBlockChainRepo.bc.addBlock(data);
  }
}

module.exports = InMemoryBlockChainRepo;
