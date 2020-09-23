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
    blockChain = new BlockChain();
    transactionPool = new TransactionPool();
    p2pServer = new P2PServer(blockChain, transactionPool);
    wallet.createTransaction("ASDF1234QWERT", 40, transactionPool);
    wallet.createTransaction("MNBV0987YUIO", 10, transactionPool);
    miner = new Miner(blockChain, transactionPool, wallet, p2pServer);
  });
  test("It should mine transactions", () => {
    const minedBlock = miner.mine();
    expect(transactionPool.transactions.length).toBe(0);
    expect(minedBlock.data.length).toBe(2);
  });
  test("It should regard to miner when mine a new transaction", () => {
    const minerPublicKey = wallet.publicKey;
    const minedBlock = miner.mine();
    const lastTransactionOutputs = minedBlock.data[1].outputs[0];
    expect(lastTransactionOutputs.amount).toBe(MINING_REWARD);
    expect(lastTransactionOutputs.address).toBe(minerPublicKey);
  });
});
