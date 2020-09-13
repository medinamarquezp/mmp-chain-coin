const SHA256 = require("crypto-js/sha256");
const { DIFFICULTY, MINE_EXECUTION_TIME_MILLISECONDS } = require("@config");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  static genesis() {
    return new this(
      "Genesis time",
      "0".repeat(64),
      "0".repeat(64),
      [],
      0,
      DIFFICULTY
    );
  }

  static mine(lastBlock, data) {
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;
    const lastHash = lastBlock.hash;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty(lastBlock, timestamp);
      hash = this.hash(timestamp, lastHash, data, nonce, difficulty);
      console.log(hash);
    } while (hash.substring(0, difficulty) != "0".repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty, timestamp } = lastBlock;
    difficulty =
      timestamp + MINE_EXECUTION_TIME_MILLISECONDS > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return this.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  toString() {
    return `BLOCK:
            Timestamp: ${this.timestamp}
            Las hash: ${this.lastHash}
            Hash: ${this.hash}
            Data: ${this.data}
            Nonce: ${this.nonce}
            Difficulty: ${this.difficulty}`;
  }
}

module.exports = Block;
