const Block = require("@entities/block");

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
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
      if (block.lastHash !== lastBlock.hash) {
        return false;
      }
    }
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log("Chain can not be replaced because new chain is shorter");
      return false;
    }
    if (!this.isValidChain(newChain)) {
      console.log("Chain can not be replaced because new chain is not valid");
      return false;
    }
    this.chain = newChain;
    console.log("Chain replaced: ", this.chain);
  }
}

module.exports = BlockChain;
