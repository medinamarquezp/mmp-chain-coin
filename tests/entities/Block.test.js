const Block = require("@entities/Block");
const { DIFFICULTY } = require("@config");
describe("Block entity test", () => {
  let data, lastBlock, block;
  beforeEach(() => {
    data = "Test block";
    lastBlock = Block.genesis();
    block = Block.mine(lastBlock, data);
  });
  test("input data should be equal to block data", () => {
    expect(data).toEqual(block.data);
  });
  test("Block lastHash property should be equal to last block hash", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });
  test("It should validate the hash difficulty", () => {
    expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY));
  });
});
