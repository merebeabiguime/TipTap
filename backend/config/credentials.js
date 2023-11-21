const credentials = (req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    `http://${process.env.AWS_FRONTEND_PUBLIC_IP_ADRESS}:3000`,
    `http://${process.env.AWS_FRONTEND_PRIVATE_IP_ADRESS}:3000`,
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
export default credentials;
