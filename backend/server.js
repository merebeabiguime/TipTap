import express from "express";
import userRoutes from "./routes/user.js";
import staffRoutes from "./routes/staff.js";
import restaurantRoutes from "./routes/restaurant.js";
import authRoutes from "./routes/auth.js";
import refreshRoutes from "./routes/refreshToken.js";
import lougoutRoutes from "./routes/logout.js";
import qrCodeRoutes from "./routes/qrCode.js";
import verifyJWT from "./routes/verifyJWT.js";
import credentials from "./config/credentials.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

const app = express();
const port = 8081;
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/restaurant", restaurantRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/refresh", refreshRoutes);
app.use("/api/logout", lougoutRoutes);

app.use("/api/staff", staffRoutes);

app.use("/api/user", userRoutes);

app.use("/api/qrcode", qrCodeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
