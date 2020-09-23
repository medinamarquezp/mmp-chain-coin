const Wallet = require("@entities/Wallet");
const Transaction = require("@entities/Transaction");
const { MINING_REWARD } = require("@config");

describe("Transaction entity test", () => {
  let senderWallet, recipientWallet;
  beforeEach(() => {
    senderWallet = new Wallet();
    recipientWallet = new Wallet();
  });
  test("It should display an error if senderWallet does not sufficient funds", () => {
    const transaction = () =>
      Transaction.newTransaction(senderWallet, recipientWallet, 100);
    expect(transaction).toThrow("Insufficient funds to transfer '100' tokens");
  });
  test("It should calculate a correct balance after a transaction", () => {
    const transaction = Transaction.newTransaction(
      senderWallet,
      recipientWallet.publicKey,
      40
    );
    const senderWalletBalance = transaction.outputs[0].amount;
    expect(senderWalletBalance).toBe(10);
  });
  test("It should verify a correct transaction", () => {
    const transaction = Transaction.newTransaction(
      senderWallet,
      recipientWallet.publicKey,
      20
    );
    expect(Transaction.verifyTransaction(transaction)).toBeTruthy();
  });
  test("It should calculate a correct balance after update transaction", () => {
    const transaction = Transaction.newTransaction(
      senderWallet,
      recipientWallet.publicKey,
      20
    );
    transaction.updateTransaction(senderWallet, recipientWallet.publicKey, 10);
    transaction.updateTransaction(senderWallet, recipientWallet.publicKey, 15);
    const senderWalletBalance = transaction.outputs[0].amount;
    expect(senderWalletBalance).toBe(5);
  });
  test("it should display an error on updating a transaction without sufficient funds", () => {
    const transaction = Transaction.newTransaction(
      senderWallet,
      recipientWallet.publicKey,
      20
    );
    const updateTransaction = () =>
      transaction.updateTransaction(
        senderWallet,
        recipientWallet.publicKey,
        1000
      );
    expect(updateTransaction).toThrow(
      "Insufficient funds to transfer '1000' tokens"
    );
  });
  test("it should reward transaction to miner", () => {
    const transaction = Transaction.rewardTransaction(
      senderWallet,
      Wallet.blockChainWallet()
    );
    const rewardedAmount = transaction.outputs.find(
      (output) => output.address.publicKey === senderWallet.publicKey
    ).amount;
    expect(rewardedAmount).toBe(MINING_REWARD);
  });
});
