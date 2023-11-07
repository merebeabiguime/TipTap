import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    res.send({
      status: "Error",
      response: "Une erreur s'est produite",
    });
  const token = authHeader.split(" ")[1];
  jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err)
        res.send({
          status: "Error",
          response: "Une erreur s'est produite",
        });
      req.user = decoded;
      next();
    }
  );
};

export default verifyJWT;
