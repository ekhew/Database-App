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

//create; post request route; creating a new dish
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

//read; get request route; display all dishes
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

//read; get request route; display searched dishes
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

//update; put request route; update a dish
app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const category = req.body.category;
  const ingredients = req.body.ingredients;
  const steps = req.body.steps;

  const updateQuery =
    "UPDATE dishes SET dish_name = ?, dish_category = ?, dish_ingredients = ?, dish_steps = ? WHERE id = ?";

  db.query(
    updateQuery,
    [name, category, ingredients, steps, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted!");
      }
    }
  );
});

//delete; delete request route; delete a dish
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

//read; get request route; display filtered dishes
app.get("/get-filtered", (req, res) => {
  //array of filtered categories passed from the 'App' component
  const filteredCategories = req.query.filteredCategories;

  //database query
  const filterQuery = "SELECT * FROM dishes WHERE dish_category REGEXP (?)";

  db.query(filterQuery, filteredCategories, (err, result) => {
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
