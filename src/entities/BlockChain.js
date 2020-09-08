const Block = require("@entities/block");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  get Chain() {
    return this.chain;
  }

  lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const block = Block.mine(this.lastBlock(), data);
    this.chain.push(block);
    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) return false;
    if (!this.isValidChain(newChain)) return false;
    this.chain = newChain;
  }
}

module.exports = BlockChain;
