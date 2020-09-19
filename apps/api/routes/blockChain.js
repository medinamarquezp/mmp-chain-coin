const express = require("express");
const router = express.Router();

const BlockChainController = require("@controllers/BlockChainController");

router.get("/blocks", BlockChainController.getBlocks);
router.post("/mine", BlockChainController.mineBlock);

module.exports = router;
