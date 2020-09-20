const InMemoryUserRepository = require("@repositories/InMemoryUserRepository");
describe("In memory user repository", () => {
  let repo;
  beforeEach(() => {
    repo = new InMemoryUserRepository();
  });
  test("it should validate if user already exists on creating a new user", async () => {
    await repo.createUser("test", "test@test.es", "testASD123");
    const createDuplicateUser = () =>
      repo.createUser("test", "test@test.es", "testASD123");
    await expect(createDuplicateUser()).rejects.toThrow("User already exists");
  });
  test("it should create a new user", async () => {
    await repo.createUser("test", "test@test.es", "testASD123");
    const firstUserOnRepo = repo.users[0];
    expect(firstUserOnRepo.email).toBe("test@test.es");
  });
  test("it should display an error on getting a token if user does not exist", async () => {
    const getUserToken = () => repo.getUserToken("test@test.es", "test");
    await expect(getUserToken()).rejects.toThrow("User does not exists");
  });
  test("it should display an error on getting a token if password is incorrect", async () => {
    await repo.createUser("test", "test@test.es", "testASD123");
    const getUserToken = () => repo.getUserToken("test@test.es", "test");
    await expect(getUserToken()).rejects.toThrow("Wrong password");
  });
  test("It should get a correct token", async () => {
    const createdUserToken = await repo.createUser(
      "test",
      "test@test.es",
      "testASD123"
    );
    const getUserToken = await repo.getUserToken("test@test.es", "testASD123");
    expect(createdUserToken).toBe(getUserToken);
  });
  test("It should find an user by token", async () => {
    const createdUserToken = await repo.createUser(
      "test",
      "test@test.es",
      "testASD123"
    );
    const foundUser = repo.findUserByToken(createdUserToken);
    expect(foundUser.username).toBe("test");
  });
  test("It should create a new wallet", async () => {
    const userToken = await repo.createUser(
      "test",
      "test@test.es",
      "testASD123"
    );
    const user = repo.findUserByToken(userToken);
    repo.createNewWallet(user.userId);
    const totalWallets = user.wallets.length;
    const walletBallance = user.wallets[0].balance;
    expect(totalWallets).toBe(1);
    expect(walletBallance).toBe(50);
  });
  test("It should display user wallets", async () => {
    const userToken = await repo.createUser(
      "test",
      "test@test.es",
      "testASD123"
    );
    const user = repo.findUserByToken(userToken);
    repo.createNewWallet(user.userId);
    const userWallets = repo.getWallets(user.userId);
    const walletBalance = userWallets[0].balance;
    expect(walletBalance).toBe(50);
  });
});
