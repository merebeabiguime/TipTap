const credentials = (req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
export default credentials;
