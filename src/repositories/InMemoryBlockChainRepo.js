class InMemoryBlockChainRepo {
  constructor(blockChain) {
    this.blockChain = blockChain;
  }

  getAllBlocks() {
    return this.blockChain.chain;
  }

  mineBlock(data) {
    return this.blockChain.addBlock(data);
  }
}

module.exports = InMemoryBlockChainRepo;
