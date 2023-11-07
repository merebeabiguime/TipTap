import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
config();

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.send({
        status: "Error",
        response: "Une erreur s'est produite",
        code: 403,
      });
    const token = authHeader.split(" ")[1];
    jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.send({
            status: "Error",
            response: "Une erreur s'est produite",
          });
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    return res.send({
      status: "Error",
      response: "Une erreur s'est produite",
    });
  }
};

export default verifyJWT;
