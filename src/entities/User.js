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
