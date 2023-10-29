import express from "express";
import {
  getUser,
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
} from "./database.js";

const app = express();
const port = 3000;

app.get("/user", async (req, res) => {
  const user = await getAllUser();
  res.send(user);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
