export const errorHandler = (
  res,
  statusCode = 500,
  msg = "Internal Server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    msg,
  });
};
