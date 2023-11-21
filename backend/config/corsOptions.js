const allowedOrigins = [
  "http://localhost:3000",
  `http://${process.env.AWS_FRONTEND_PUBLIC_IP_ADRESS}:3000`,
  `http://${process.env.AWS_FRONTEND_PRIVATE_IP_ADRESS}:3000`,
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
