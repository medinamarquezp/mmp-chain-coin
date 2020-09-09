const InMemoryBlockChainRepo = require("@repositories/InMemoryBlockChainRepo");
const BlockChain = require("@entities/BlockChain");
describe("In memory block chain repository", () => {
  let BC;
  beforeEach(() => {
    BC = new BlockChain();
  });
  test("get all blocks method should return BC chain", () => {
    const allBlocks = InMemoryBlockChainRepo.getAllBlocks();
    expect(allBlocks).toEqual(BC.Chain);
  });
  test("mined blocks should display request block data", () => {
    const requestBlockData = "Contenido del block";
    InMemoryBlockChainRepo.mineBlock(requestBlockData);
    const getAllBlock = InMemoryBlockChainRepo.getAllBlocks();
    const getLastMinedBlock = getAllBlock[getAllBlock.length - 1];
    expect(getLastMinedBlock.data).toEqual(requestBlockData);
  });
});
