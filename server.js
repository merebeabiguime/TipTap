import express from "express";
import * as db from "./database.js";
const app = express();
const port = 3000;

/***************************************** GET ALL ***************************************************** */

app.get("/user", async (req, res) => {
  const result = await db.getAllUser();
  res.send(result);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger les utilisateurs");
});
app.get("/staff", async (req, res) => {
  const result = await db.getAllStaff();
  result != 0 ? res.send(result) : res.send("Impossible de charger le staff");
});
app.get("/comment", async (req, res) => {
  const result = await db.getAllComment();
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger les commentaires");
});
app.get("/restaurant", async (req, res) => {
  const result = await db.getAllRestaurant();
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger les restaurants");
});

/***************************************** GET SPECIFIC ***************************************************** */

app.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getUser(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger cet utilisateur");
});

app.get("/staff/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getStaff(id);
  result != 0 ? res.send(result) : res.send("Impossible de charger ce staff");
});
app.get("/restaurant/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getRestaurant(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger ce restaurant");
});
app.get("/comment/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.getComment(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de charger ce commentaire");
});

/***************************************** DELETE  ***************************************************** */

app.get("/user/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteUser(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de supprimer cet utilisateur");
});

app.get("/staff/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteStaff(id);
  result != 0 ? res.send(result) : res.send("Impossible de supprimer ce staff");
});
app.get("/restaurant/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteRestaurant(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de supprimer ce restaurant");
});
app.get("/comment/delete/:id", async (req, res) => {
  const id = req.params.id;
  const result = await db.deleteComment(id);
  result != 0
    ? res.send(result)
    : res.send("Impossible de supprimer ce commentaire");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
