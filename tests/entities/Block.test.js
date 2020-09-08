const Block = require("@entities/Block");
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
});
