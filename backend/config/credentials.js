const credentials = (req, res, next) => {
  const allowedOrigins =
    process.env.NODE_ENV === "production"
      ? "http://35.180.203.65:3000"
      : "http://localhost:3000";
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
export default credentials;
