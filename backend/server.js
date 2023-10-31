import express from "express";
import userRoutes from "./routes/user.js";
import cors from "cors";
const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
