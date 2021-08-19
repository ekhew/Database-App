import styles from "../styles/Create.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Create() {
  //'Create' function component states used to store user input
  const [dishName, setDishName] = useState("");
  const [dishCategory, setDishCategory] = useState("");
  const [dishIngredients, setDishIngredients] = useState("");
  const [dishSteps, setDishSteps] = useState("");

  //create; post request; creating a new dish
  const addDish = () => {
    Axios.post("http://localhost:3001/create", {
      name: dishName,
      category: dishCategory,
      ingredients: dishIngredients,
      steps: dishSteps,
    }).then(() => {
      alert("Dish successfully created!");
    });
  };

  //render component into browser
  return (
    <div className={styles.Create}>
      <div id={styles.topContainer}>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      <div id={styles.bottomContainer}>
        <h2>Create a New Dish</h2>
        <label>Dish Name:</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setDishName(event.target.value);
          }}
        />
        <label>Category:</label>
        <input
          type="text"
          placeholder="meat, vegetable, soup, ..."
          onChange={(event) => {
            setDishCategory(event.target.value);
          }}
        />
        <label>Ingredients:</label>
        <input
          type="text"
          placeholder="salt, pepper, ..."
          onChange={(event) => {
            setDishIngredients(event.target.value);
          }}
        />
        <label>Steps:</label>
        <textarea
          placeholder="Write steps here..."
          onChange={(event) => {
            setDishSteps(event.target.value);
          }}
        />
        <button onClick={addDish}>Done</button>
      </div>
    </div>
  );
}

export default Create;
