class ResponseHandler {
  static response(res, data) {
    const statusCode = 200;
    return res.status(statusCode).json({
      status: "ok",
      statusCode,
      data,
    });
  }
}
module.exports = ResponseHandler;
