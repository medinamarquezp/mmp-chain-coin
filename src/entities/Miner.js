const Wallet = require("@entities/Wallet");
const Transaction = require("@entities/Transaction");

class Miner {
  constructor(blockchain, transactionPool, walletPublicKey, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.walletPublicKey = walletPublicKey;
    this.p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    validTransactions.push(
      Transaction.rewardTransaction(
        this.walletPublicKey,
        Wallet.blockChainWallet()
      )
    );
    const block = this.blockchain.addBlock(validTransactions);
    this.p2pServer.syncChains();
    this.transactionPool.clear();
    this.p2pServer.broadcastClearTransaction();
    return block;
  }

  static getTransactionsOutputs(minedBlock) {
    return minedBlock.data.map((transaction) => transaction.outputs);
  }

  static rewardTransaction(minedBlock) {
    const outputs = Miner.getTransactionsOutputs(minedBlock);
    return outputs.slice(outputs.length - 1, outputs.length).flat()[0];
  }

  static transactionList(minedBlock) {
    const outputs = Miner.getTransactionsOutputs(minedBlock);
    const transactions = outputs.slice(0, outputs.length - 1);
    let list = [];
    transactions.forEach((transaction) =>
      transaction.forEach((object, index) => {
        index === 0 ? (object.action = "replace") : (object.action = "add");
        list.push(object);
      })
    );
    return list;
  }
}

module.exports = Miner;
