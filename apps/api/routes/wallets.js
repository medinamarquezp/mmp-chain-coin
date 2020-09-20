const express = require("express");
const router = express.Router();

const isLogged = require("@middlewares/isLogged");
const WalletsController = require("@controllers/WalletsController");

router.get("/", isLogged, WalletsController.getWallets);
router.post("/", isLogged, WalletsController.createWallet);

module.exports = router;
