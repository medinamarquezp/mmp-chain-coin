const Miner = require("@entities/Miner");
const Wallet = require("@entities/Wallet");
const BlockChain = require("@entities/BlockChain");
const P2PServer = require("@apps/p2p/P2PServer");
const TransactionPool = require("@entities/TransactionPool");
const { MINING_REWARD } = require("@config");

describe("Miner entity test", () => {
  let wallet, blockChain, p2pServer, transactionPool, miner;
  beforeEach(() => {
    wallet = new Wallet();
    wallet2 = new Wallet();
    blockChain = new BlockChain();
    transactionPool = new TransactionPool();
    p2pServer = new P2PServer(blockChain, transactionPool);
    wallet.createTransaction("ASDF1234QWERT", 40, transactionPool);
    wallet.createTransaction("MNBV0987YUIO", 10, transactionPool);
    wallet2.createTransaction("MNBV0987YUIO", 50, transactionPool);
    miner = new Miner(blockChain, transactionPool, wallet, p2pServer);
  });
  test("It should mine transactions", () => {
    const minedBlock = miner.mine();
    expect(transactionPool.transactions.length).toBe(0);
    expect(minedBlock.data.length).toBe(3);
  });
  test("It should regard to miner when mine a new transaction", () => {
    const minerPublicKey = wallet.publicKey;
    const minedBlock = miner.mine();
    const rewardTransaction = Miner.rewardTransaction(minedBlock);
    expect(rewardTransaction.amount).toBe(MINING_REWARD);
    expect(rewardTransaction.address.publicKey).toBe(minerPublicKey);
  });
  test("It should get transactions list without rewarded transaction", () => {
    const minedBlock = miner.mine();
    const transactionList = Miner.transactionList(minedBlock);
    expect(transactionList.length).toBe(5);
    expect(transactionList[0].action).toBe("replace");
    expect(transactionList[1].action).toBe("add");
    expect(transactionList[1].amount).toBe(40);
  });
});
