const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? "http://35.180.203.65:3000"
    : "http://localhost:3000";

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
