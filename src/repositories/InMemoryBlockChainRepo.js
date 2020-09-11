class InMemoryBlockChainRepo {
  constructor(blockChain) {
    this.blockChain = blockChain;
  }

  getAllBlocks() {
    return this.blockChain.Chain;
  }

  mineBlock(data) {
    return this.blockChain.addBlock(data);
  }
}

module.exports = InMemoryBlockChainRepo;
