import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import corsOptions from "./config/corsOptions.js";
import credentials from "./config/credentials.js";
import authRoutes from "./routes/auth.js";
import qrCodeRoutes from "./routes/qrCode.js";
import restaurantRoutes from "./routes/restaurant.js";
import staffRoutes from "./routes/staff.js";
import userRoutes from "./routes/user.js";

const app = express();
const port = 8081;
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/restaurant", restaurantRoutes);

app.use("/auth", authRoutes);

app.use("/staff", staffRoutes);

app.use("/user", userRoutes);

app.use("/qrcode", qrCodeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
