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
  test("It should verify an existing transaction in the pool", () => {
    const transaction = Transaction.newTransaction(
      senderWallet,
      recipientWallet.publicKey,
      10
    );
    pool.updateOrAddTransaction(transaction);
    const existsTransaction = pool.findTransactionById(transaction.id);
    expect(existsTransaction).toBeTruthy();
  });
  test("It should update the values of an existing transaction on the pool", () => {
    const transaction = Transaction.newTransaction(
      senderWallet,
      recipientWallet.publicKey,
      10
    );
    pool.updateOrAddTransaction(transaction);
    transaction.updateTransaction(senderWallet, recipientWallet.publicKey, 30);
    pool.updateOrAddTransaction(transaction);
    const transactionBalanceResult = pool.transactions[0].outputs[0].amount;
    expect(transactionBalanceResult).toBe(10);
  });
});
