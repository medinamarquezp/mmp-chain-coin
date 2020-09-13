const SHA256 = require("crypto-js/sha256");
const { DIFFICULTY, MINE_EXECUTION_TIME_MILLISECONDS } = require("@config");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty, processTime) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
    this.processTime = processTime;
  }

  static genesis() {
    return new this(
      "Genesis time",
      "0".repeat(64),
      "0".repeat(64),
      [],
      0,
      DIFFICULTY,
      0
    );
  }

  static mine(lastBlock, data) {
    const initTime = Date.now();
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;
    const lastHash = lastBlock.hash;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      console.log(hash);
      console.log(difficulty);
    } while (hash.substring(0, difficulty) != "0".repeat(difficulty));
    const processTime = Date.now() - initTime;
    return new this(
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty,
      processTime
    );
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_EXECUTION_TIME_MILLISECONDS > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty === 0 ? DIFFICULTY : difficulty;
  }

  static hash(timestamp, lastHash, data, nonce, difficulty, processTime) {
    return SHA256(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}${processTime}`
    ).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty, processTime } = block;
    return this.hash(timestamp, lastHash, data, nonce, difficulty, processTime);
  }

  toString() {
    return `BLOCK:
            Timestamp: ${this.timestamp}
            Las hash: ${this.lastHash}
            Hash: ${this.hash}
            Data: ${this.data}
            Nonce: ${this.nonce}
            Difficulty: ${this.difficulty}
            Process time: ${this.processTime}`;
  }
}

module.exports = Block;
