class InMemoryBlockChainRepo {
  constructor(blockChain) {
    this.blockChain = blockChain;
  }

  getAllBlocks() {
    return this.blockChain.chain;
  }

  mineBlock(data) {
    const block = this.blockChain.addBlock(data);
    console.log(`New block added to chain: ${block}`);
    return block;
  }
}

module.exports = InMemoryBlockChainRepo;
