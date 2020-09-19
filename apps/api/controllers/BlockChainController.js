const BlockChainRepo = require("@repositories/InMemoryBlockChainRepo");
const Exception = require("@exceptions/Exception");
const ResponseHandler = require("@handlers/ResponseHandler");
const BlockChainSingleton = require("@api/BlockChainSingleton");
const P2PServerSingleton = require("@api/P2PServerSingleton");
class BlockChainController {
  static repo = new BlockChainRepo(BlockChainSingleton.getInstance());

  static getBlocks(req, res) {
    const blocks = BlockChainController.repo.getAllBlocks();
    ResponseHandler.response(res, blocks);
  }
  static mineBlock(req, res) {
    const { data } = req.body;
    if (!data)
      throw new Exception(
        400,
        "data property is mandatory to perform this request"
      );
    try {
      const p2pServerInstance = P2PServerSingleton.getInstance();
      BlockChainController.repo.mineBlock(data);
      p2pServerInstance.syncChains();
      res.redirect("/api/blockchain/blocks");
    } catch (error) {
      throw new Exception(500, `Error on mining a new block: ${error}`);
    }
  }
}

module.exports = BlockChainController;
