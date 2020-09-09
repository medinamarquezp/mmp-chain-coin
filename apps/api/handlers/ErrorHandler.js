class ErrorHandler {
  static response(err, res) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }
}
module.exports = ErrorHandler;
