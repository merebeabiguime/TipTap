import express from "express";
import userRoutes from "./routes/user.js";
import restaurantRoutes from "./routes/restaurant.js";
import commentRoutes from "./routes/comment.js";
import staffRoutes from "./routes/staff.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/user", userRoutes);
app.use("/staff", staffRoutes);
app.use("/comment", commentRoutes);
app.use("/restaurant", restaurantRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
