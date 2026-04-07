const AppError = require('../utils/AppError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const status = err instanceof AppError ? err.statusCode : err.status || 500;
  const message =
    err instanceof AppError
      ? err.message
      : status === 500
        ? 'Erro interno do servidor'
        : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && status === 500 && { detail: err.message }),
  });
}

module.exports = errorHandler;
