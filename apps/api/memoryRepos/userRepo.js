const InMemoryUserRepository = require("@repositories/InMemoryUserRepository");

let users = null;
const userRepoInstance = () => {
  if (users === null) {
    users = new InMemoryUserRepository();
    return users;
  }
  return users;
};

const userRepo = userRepoInstance();

module.exports = userRepo;
