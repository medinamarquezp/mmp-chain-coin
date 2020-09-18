const User = require("@entities/User");
const Hash = require("@services/Hash");

class InMemoryUserRepository {
  constructor() {
    this.users = [];
  }
  async createUser(username, email, password) {
    this.validateIfUserExists(email);
    User.validatePassword(password);
    const hashedPassword = await Hash.password(password);
    const userCreated = new User(username, email, hashedPassword);
    this.users.push(userCreated);
    return userCreated.getUserToken();
  }

  async getUserToken(email, password) {
    this.validateIfUserDoesNotExist(email);
    const user = this.findUserByEmail(email);
    const isPasswordCorrect = await Hash.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Incorrect password");
    return user.getUserToken();
  }

  findUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  validateIfUserExists(email) {
    if (this.findUserByEmail(email)) throw new Error("User already exists");
  }

  validateIfUserDoesNotExist(email) {
    if (!this.findUserByEmail(email)) throw new Error("User does not exists");
  }
}

module.exports = InMemoryUserRepository;
