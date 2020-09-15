const Wallet = require("@entities/Wallet");
const Transaction = require("@entities/Transaction");

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
});
