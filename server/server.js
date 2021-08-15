const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//connect to MySQL database
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "cookbook",
});

//create; post request route
app.post("/create", (req, res) => {
  //get information from the Axios post request in the client side
  const name = req.body.name;
  const category = req.body.category;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;

  //database query
  const postQuery =
    "INSERT INTO dishes (dish_name, dish_category, dish_ingredients, dish_steps) VALUES (?,?,?,?)";

  db.query(postQuery, [name, category, ingredients, steps], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Values Inserted!");
    }
  });
});

//read; get request route
app.get("/get-all", (req, res) => {
  //database query
  const getQuery = "SELECT * FROM dishes";

  db.query(getQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//read; get request route
app.get("/search/:name", (req, res) => {
  const name = req.params.name;

  //database query
  const getQuery = "SELECT * FROM dishes WHERE dish_name REGEXP ?";

  db.query(getQuery, "^" + name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//delete; delete request route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  const deleteQuery = "DELETE FROM dishes WHERE id = ?";

  db.query(deleteQuery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001.");
});
