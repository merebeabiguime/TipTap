import express from "express";
import userRoutes from "./routes/user.js";
import staffRoutes from "./routes/staff.js";
import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refreshToken.js";
import lougoutRoutes from "./routes/logout.js";
import verifyJWT from "./routes/verifyJWT.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use("/refresh", refreshRoutes);
app.use("/logout", lougoutRoutes);

app.use(verifyJWT);

app.use("/user", userRoutes);
app.use("/staff", staffRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
