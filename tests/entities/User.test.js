const Token = require("@services/Token");
const User = require("@entities/User");
const Wallet = require("@entities/Wallet");

describe("User entity test", () => {
  let user, wallet;
  beforeEach(() => {
    user = new User("medinamarquezp", "medinamarquezp@test.es", "test1234");
    wallet = new Wallet();
  });
  test("it should verify a valid token info", () => {
    const userToken = user.getUserToken();
    const decodedToken = Token.decode(userToken);
    expect(decodedToken.data.userId).toBe(user.userId);
    expect(decodedToken.data.username).toBe(user.username);
  });
  test("it should display an error on saving two times the same wallet", () => {
    user.addNewWallet(wallet);
    const addSameWallet = () => user.addNewWallet(wallet);
    expect(addSameWallet).toThrow("The wallet already exists for this user");
  });
  test("it should return the balance of an user wallet", () => {
    user.addNewWallet(wallet);
    const userWallets = user.getWallets();
    const walletById = userWallets.find(
      (userWallet) => userWallet.id === wallet.id
    );
    expect(walletById.balance).toBe(50);
  });
});
