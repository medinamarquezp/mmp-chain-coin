const ws = require("ws");

const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
const P2P_PORT = process.env.P2P_PORT || 5001;

class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
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
      this.blockchain.replaceChain(data);
      console.log("Data: ", data);
    });
  }

  sendChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }

  syncChains() {
    this.sockets.forEach((socket) => {
      this.sendChain(socket);
    });
  }
}
module.exports = P2PServer;
