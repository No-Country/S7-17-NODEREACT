const handleError = (error, req, res, next) => {
  const { status, errorContent, message } = error;
  res.status(status).json({
    message,
    error: errorContent
  });
};

module.exports = handleError;
