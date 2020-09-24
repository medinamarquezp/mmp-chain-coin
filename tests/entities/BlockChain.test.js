const Block = require("@entities/Block");
const BlockChain = require("@entities/BlockChain");
const Hash = require("@services/Hash");
describe("Block chain entity test", () => {
  let BC;
  beforeEach(() => {
    BC = new BlockChain();
    newBC = new BlockChain();
  });
  test("first element on BC should be equal to block genesis", () => {
    const firstBCElement = BC.chain[0];
    expect(firstBCElement).toEqual(Block.genesis());
  });
  test("last block added to BC should contain input data", () => {
    const data = "Test data";
    BC.addBlock(data);
    expect(BC.lastBlock().data).toEqual(Hash.sha256(data));
  });
  test("it should validate a valid BC", () => {
    BC.addBlock("Test block valido");
    expect(BC.isValidChain(BC.chain)).toBeTruthy();
  });
  test("it should not validate a chain with a corrupt genesis block", () => {
    BC.chain[0].data = "Bloque genesis corrupto";
    expect(BC.isValidChain(BC.chain)).toBeFalsy();
  });
  test("it should replace the original BC for a new, longer and valid BC", () => {
    newBC.addBlock("Bloque adicional");
    BC.replaceChain(newBC.chain);
    expect(BC.chain).toEqual(newBC.chain);
  });
  test("it should not replace the original BC if new BC has the same length", () => {
    BC.addBlock("Bloque inicial");
    newBC.addBlock("Bloque inicial");
    BC.replaceChain(newBC.chain);
    expect(BC.chain).not.toBe(newBC.chain);
  });
});
