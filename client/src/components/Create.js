import styles from "../styles/Create.module.css";
import React from "react";
import { Link } from "react-router-dom";

function Create() {
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
        <input type="text" placeholder="Name" />
        <label>Category:</label>
        <input type="text" placeholder="meat, vegetable, soup, ..." />
        <label>Ingredients:</label>
        <input type="text" placeholder="salt, pepper, ..." />
        <label>Steps:</label>
        <textarea placeholder="Write steps here..." />
        <button>Add Dish</button>
      </div>
    </div>
  );
}
/*
onChange={(event) => {
  setDishName(event.target.value);
}

 <button onClick={addDish}>Add Dish</button>
*/
export default Create;
