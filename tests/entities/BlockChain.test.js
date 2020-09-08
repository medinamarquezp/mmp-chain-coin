const Block = require("@entities/Block");
const BlockChain = require("@entities/BlockChain");
describe("Block chain entity test", () => {
  let BC;
  beforeEach(() => {
    BC = new BlockChain();
    newBC = new BlockChain();
  });
  test("first element on BC should be equal to block genesis", () => {
    const firstBCElement = BC.Chain[0];
    expect(firstBCElement).toEqual(Block.genesis());
  });
  test("last block added to BC should contain input data", () => {
    const data = "Test data";
    const chainBlock = BC.addBlock(data);
    expect(BC.lastBlock().data).toEqual(data);
  });
  test("it should validate a valid BC", () => {
    BC.addBlock("Test block valido");
    expect(BC.isValidChain(BC.Chain)).toBeTruthy();
  });
  test("it should not validate a chain with a corrupt genesis block", () => {
    BC.Chain[0].data = "Bloque genesis corrupto";
    expect(BC.isValidChain(BC.Chain)).toBeFalsy();
  });
  test("it should not validate a corrupted chain", () => {
    BC.addBlock("Bloque correcto");
    BC.Chain[1].data = "Bloque dañado";
    expect(BC.isValidChain(BC.Chain)).toBeFalsy();
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
    expect(BC.chain).not.toEqual(newBC.chain);
  });
});
