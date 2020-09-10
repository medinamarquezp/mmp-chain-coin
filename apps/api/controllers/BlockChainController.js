const BlockChainRepo = require("@repositories/InMemoryBlockChainRepo");
const Exception = require("@exceptions/Exception");
const ResponseHandler = require("@handlers/ResponseHandler");
class BlockChainController {
  static getBlocks(req, res) {
    const blocks = BlockChainRepo.getAllBlocks();
    ResponseHandler.response(res, blocks);
  }

  static mineBlock(req, res) {
    const { data } = req.body;
    if (!data)
      throw new Exception(
        400,
        "data property is mandatory to perform this request"
      );
    const block = BlockChainRepo.mineBlock(data);
    console.log(`New block added to chain: ${block}`);
    res.redirect("/api/blocks");
  }
}

module.exports = BlockChainController;
