const User = require("@entities/User");
const Wallet = require("@entities/Wallet");
const Hash = require("@services/Hash");
const Token = require("@services/Token");

class InMemoryUserRepository {
  constructor() {
    this.users = [];
  }

  async createUser(username, email, password) {
    this.validateIfUserExists(email);
    const hashedPassword = await Hash.password(password);
    const userCreated = new User(username, email, hashedPassword);
    this.users.push(userCreated);
    return userCreated.getUserToken();
  }

  async getUserToken(email, password) {
    this.validateIfUserDoesNotExist(email);
    const user = this.findUserByProperty(email);
    const isPasswordCorrect = await Hash.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Wrong password");
    return user.getUserToken();
  }

  findUserByProperty(property, value) {
    return this.users.find((user) => user[property] === value);
  }

  findUserById(userId) {
    const userFound = this.findUserByProperty("userId", userId);
    if (!userFound) throw new Error(`No user found with ID ${userId}`);
    return userFound;
  }

  findUserByToken(token) {
    const decodedToken = Token.decode(token);
    const foundUser = this.findUserByProperty(
      "userId",
      decodedToken.data.userId
    );
    if (!foundUser) {
      throw new Error("Invalid token");
    }
    return foundUser;
  }

  validateIfUserExists(email) {
    if (this.findUserByProperty("email", email))
      throw new Error("User already exists");
  }

  validateIfUserDoesNotExist(email) {
    if (!this.findUserByProperty("email", email))
      throw new Error("User does not exists");
  }

  getWallets(userId) {
    const userFound = this.findUserById(userId);
    return userFound.getWallets();
  }

  getWallet(userId, walletId) {
    const user = this.findUserById(userId);
    const userWallets = user.wallets;
    const walletFound = this.findWallet(userWallets, walletId);
    return walletFound;
  }

  createNewWallet(userId) {
    const userFound = this.findUserById(userId);
    const wallet = new Wallet();
    userFound.addNewWallet(wallet);
    return userFound;
  }

  updateWalletBalance(publicKey, amount) {
    this.users = this.users.map((user) => {
      if (user.wallets) {
        const index = user.wallets.findIndex(
          (wallet) => wallet.publicKey === publicKey
        );
        user.wallets[index].balance += amount;
      }
      return user;
    });
  }

  findWallet(userWallets, walletId) {
    const walletFound = userWallets.find((wallet) => wallet.id === walletId);
    if (!walletFound) throw new Error(`No wallets found by id ${walletId}`);
    return walletFound;
  }

  findWalletByPublicKey(userWallets, publicKey) {
    const walletFound = userWallets.find(
      (wallet) => wallet.publicKey === publicKey
    );
    if (!walletFound)
      throw new Error(`No wallets found by public key ${publicKey}`);
    return walletFound;
  }
}

module.exports = InMemoryUserRepository;
