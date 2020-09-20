const userRepo = require("@memorepos/userRepo");
const Exception = require("@exceptions/Exception");

const isLogged = (req, res, next) => {
  try {
    const token = getHeadersToken(req);
    const userFound = userRepo.findUserByToken(token);
    if (!userFound) throw new Error("User not found");
    req.userId = userFound.userId;
    next();
  } catch (error) {
    return next(new Exception(401, `Unauthorized: ${error.message}`));
  }
};

const getHeadersToken = (req) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    return token;
  } catch (error) {
    throw new Error(`Incorrect authorization header: ${error}`);
  }
};

module.exports = isLogged;
