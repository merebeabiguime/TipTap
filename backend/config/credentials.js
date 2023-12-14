const credentials = (req, res, next) => {
  const allowedOrigins = "https://tiptap.biz";
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
export default credentials;
