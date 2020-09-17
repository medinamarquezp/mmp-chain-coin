const jwt = require("jsonwebtoken");

class Token {
  static secret = process.env.TOKEN_SECRET || "Sup3rSecr3t";

  static encode(data) {
    return jwt.sign({ data }, Token.secret, { expiresIn: "30m" });
  }

  static decode(token) {
    return jwt.verify(token, this.secret);
  }
}

module.exports = Token;
