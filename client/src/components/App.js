import styles from "../styles/App.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Collapsible from "./Collapsible";

function App() {
  //'App' function component states used to store user input
  const [showList, setShowList] = useState([]);
  const [searchName, setSearchName] = useState("");

  //read; get request
  const getAllDishes = () => {
    Axios.get("http://localhost:3001/get-all").then((response) => {
      setShowList(response.data);
    });
  };

  //read; get request
  const searchDishes = (name) => {
    Axios.get(`http://localhost:3001/search/${name}`).then((response) => {
      setShowList(response.data);
    });
  };

  //delete; delete request
  const deleteDish = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setShowList(
        showList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  //render into browser
  return (
    <div className={styles.App}>
      <div id={styles.topContainer}>
        <Link to="/Create">
          <button className={styles.addBtn}>Create New</button>
        </Link>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search here"
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <button onClick={() => searchDishes(searchName)}>Search</button>
          <button onClick={getAllDishes}>Show All</button>
        </div>
      </div>

      <div id={styles.bottomContainer}>
        {showList.map((val, key) => {
          return (
            <Collapsible title={val.dish_name} category={val.dish_category}>
              <div className={styles.ingredients}>
                <p className={styles.heading}>Ingredients:</p>
                <p>{val.dish_ingredients}</p>
              </div>
              <div className={styles.steps}>
                <p className={styles.heading}>Steps:</p>
                <p>{val.dish_steps}</p>
              </div>
              <div className={styles.buttons}>
                <button id={styles.updateBtn}>Update</button>
                <button
                  id={styles.deleteBtn}
                  onClick={() => deleteDish(val.id)}
                >
                  Delete
                </button>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}

export default App;
