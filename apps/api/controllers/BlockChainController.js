const BlockChainRepo = require("@repositories/InMemoryBlockChainRepo");

class BlockChainController {
  static getBlocks(req, res) {
    const blocks = BlockChainRepo.getAllBlocks();
    return res.status(200).json(blocks);
  }
}

module.exports = BlockChainController;
