const Uuid = require("@services/Uuid");
const Token = require("@services/Token");

class User {
  constructor(username, email, password) {
    this.userId = Uuid.generate();
    this.username = username;
    this.email = email;
    this.password = password;
    this.wallets = [];
  }

  static validatePassword(password) {
    if (!password) throw new Error("Password required");
    const regexAZaz09min8 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/;
    if (!regexAZaz09min8.test(password))
      throw new Error(
        "Password must have at least 8 characters, letters and numbers [a-zA-Z0-9]"
      );
  }

  getUserToken() {
    const userData = {
      userId: this.userId,
      username: this.username,
    };
    return Token.encode(userData);
  }

  getWallets() {
    const wallets = [];
    this.wallets.forEach((wallet) => {
      wallets.push(wallet.getWalletData());
    });
    return wallets;
  }

  addNewWallet(wallet) {
    this.checkWalletExists(wallet.id);
    this.wallets.push(wallet);
  }

  checkWalletExists(walletID) {
    const walletFound = this.wallets.find((wallet) => (wallet.id = walletID));
    if (walletFound) throw new Error("The wallet already exists for this user");
  }
}

module.exports = User;
