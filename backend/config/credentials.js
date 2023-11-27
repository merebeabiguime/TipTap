const credentials = (req, res, next) => {
  const allowedOrigins = "http://35.180.203.65";
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
export default credentials;
