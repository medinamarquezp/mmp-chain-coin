const Wallet = require("@entities/Wallet");
const Transaction = require("@entities/Transaction");
const TransactionPool = require("@entities/TransactionPool");

describe("Transaction entity test", () => {
  let senderWallet, recipientWallet, pool;
  beforeEach(() => {
    senderWallet = new Wallet();
    recipientWallet = new Wallet();
    pool = new TransactionPool();
  });
  test("It should find a created transaction from wallet on pool", () => {
    const transaction = senderWallet.createTransaction(
      recipientWallet,
      20,
      pool
    );
    const existsTransaction = pool.findTransactionById(transaction.id);
    expect(existsTransaction).toBeTruthy();
  });
  test("It should update the balance after create a transaction from wallet", () => {
    const transaction = senderWallet.createTransaction(
      recipientWallet,
      20,
      pool
    );
    const transactionSavedOnPool = pool.findTransactionById(transaction.id);
    const balance = transactionSavedOnPool.outputs[0].amount;
    expect(balance).toBe(30);
  });
});
