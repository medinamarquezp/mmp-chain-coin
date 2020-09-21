const ws = require("ws");

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

const messageTypes = {
  chain: "CHAIN",
  transaction: "TRANSACTION",
  clear_transactions: "CLEAR_TRANSACTIONS",
};

class P2PServer {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.sockets = [];
  }

  listen() {
    const server = new ws.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectedSockets(socket));
    this.connectToPeers();
    console.log(`P2P Server listening for connections on port ${P2P_PORT}`);
  }

  connectToPeers() {
    peers.forEach((peer) => {
      const socket = new ws(peer);
      socket.on("open", () => this.connectedSockets(socket));
    });
  }

  connectedSockets(socket) {
    this.sockets.push(socket);
    console.log("New socket connected!");
    this.messageHandler(socket);
    this.sendChain(socket);
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      switch (data.type) {
        case messageTypes.chain:
          this.blockchain.replaceChain(data.chain);
          break;
        case messageTypes.transaction:
          this.transactionPool.updateOrAddTransaction(data.transaction);
          break;
        case messageTypes.clear_transactions:
          this.transactionPool.clear();
          break;
      }
    });
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: messageTypes.chain,
        chain: this.blockchain.chain,
      })
    );
  }

  syncChains() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }

  sendTransaction(socket, transaction) {
    socket.send(
      JSON.stringify({
        type: messageTypes.transaction,
        transaction,
      })
    );
  }

  broadcastTransaction(transaction) {
    this.sockets.forEach((socket) => {
      this.sendTransaction(socket, transaction);
    });
  }

  broadcastClearTransaction() {
    this.sockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: messageTypes.clear_transactions,
        })
      );
    });
  }
}
module.exports = P2PServer;
