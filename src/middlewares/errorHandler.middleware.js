const { Request, Response, NextFunction } = require('express');
const { IsApiError, ApiError } = require('../utils/ApiError');
const currentEnv = process.env.NODE_ENV || 'development';
/**
 * Global error handler for all routes
 * @param {ApiError} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const globalErrorHandler = (err, _req, res, next) => {
  if (res.headersSent) return next(err);
  if (IsApiError(err))
    return res.status(err.statusCode).json({ message: err.message });
  if (currentEnv === 'development') {
    console.log(err);
    return res.status(500).send(err.message);
  }
  console.log(err);
  return res.status(500).send('Something went wrong');
};

module.exports = globalErrorHandler;
