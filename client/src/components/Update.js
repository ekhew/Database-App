import styles from "../styles/Update.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

//"update a dish" page
function Update(props) {
  //'Update' function component states used to store user input; initial values are passed in from the 'App' component
  const [dishName, setDishName] = useState(`${props.location.state.name}`);
  const [dishCategory, setDishCategory] = useState(
    `${props.location.state.category}`
  );
  const [dishIngredients, setDishIngredients] = useState(
    `${props.location.state.ingredients}`
  );
  const [dishSteps, setDishSteps] = useState(`${props.location.state.steps}`);

  //update; put request; update a dish
  const updateDish = () => {
    Axios.put("http://localhost:3001/update", {
      id: props.location.state.id,
      name: dishName,
      category: dishCategory,
      ingredients: dishIngredients,
      steps: dishSteps,
    }).then(() => {
      alert("Dish successfully updated!");
    });
  };

  //render component into browser
  return (
    <div className={styles.Update}>
      <div id={styles.topContainer}>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
      <div id={styles.bottomContainer}>
        <h2>Update Dish</h2>
        <label>Dish Name:</label>
        <input
          type="text"
          defaultValue={props.location.state.name}
          onChange={(event) => {
            setDishName(event.target.value);
          }}
        />
        <label>Category:</label>
        <input
          type="text"
          defaultValue={props.location.state.category}
          onChange={(event) => {
            setDishCategory(event.target.value);
          }}
        />
        <label>Ingredients:</label>
        <textarea
          type="text"
          defaultValue={props.location.state.ingredients}
          onChange={(event) => {
            setDishIngredients(event.target.value);
          }}
        />
        <label>Steps:</label>
        <textarea
          defaultValue={props.location.state.steps}
          onChange={(event) => {
            setDishSteps(event.target.value);
          }}
        />
        <button onClick={updateDish}>Save</button>
      </div>
    </div>
  );
}

export default Update;
