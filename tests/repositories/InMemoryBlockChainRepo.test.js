const Hash = require("@services/Hash");
const InMemoryBlockChainRepo = require("@repositories/InMemoryBlockChainRepo");
const BlockChain = require("@entities/BlockChain");
describe("In memory block chain repository", () => {
  let BC, repo;
  beforeEach(() => {
    BC = new BlockChain();
    repo = new InMemoryBlockChainRepo(BC);
  });
  test("get all blocks method should return BC chain", () => {
    const allBlocks = repo.getAllBlocks();
    expect(allBlocks).toEqual(BC.chain);
  });
  test("mined blocks should display request block data", () => {
    const requestBlockData = "Contenido del block";
    repo.mineBlock(requestBlockData);
    const getAllBlock = repo.getAllBlocks();
    const getLastMinedBlock = getAllBlock[getAllBlock.length - 1];
    expect(getLastMinedBlock.data).toEqual(Hash.sha256(requestBlockData));
  });
});
