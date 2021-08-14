import './App.css';
import React, {useState} from 'react';
import Axios from 'axios';
import Collapsible from './components/Collapsible'

function App() {

  //'App' function component states used to store user input
  const [dishName, setDishName] = useState("");
  const [dishCategory, setDishCategory] = useState("");
  const [dishIngredients, setDishIngredients] = useState("");
  const [dishSteps, setDishSteps] = useState("");

  const [showList, setShowList] = useState([]);
  const [searchName, setSearchName] = useState("");

  //create; post request
  const addDish = () => {
    Axios.post('http://localhost:3001/create', {
      name: dishName, 
      category: dishCategory, 
      ingredients: dishIngredients,
      steps: dishSteps,
    }).then(() => {
      getAllDishes();
    });
  };

  //read; get request
  const getAllDishes = () => {
    Axios.get('http://localhost:3001/get-all').then((response) => {
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
  const deleteDish= (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setShowList(showList.filter((val) => {
        return val.id !== id;
      }))
    });
  };

  //render into browser
  return(
    <div className="App">

      <div className="container" id="left-container">
        <h2>Database Application</h2>

        <div className="search-section">
        <label>Search For a Dish</label>
          <input 
            type="text"
            placeholder="search here"
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <button onClick={() => searchDishes(searchName)}>Search</button>
          <button onClick={getAllDishes}>Show All</button>
        </div>

        <div className="add-section">
          <label>Dish Name</label>
          <input 
            type="text" 
            placeholder="name"
            onChange={(event) => {
              setDishName(event.target.value);
            }}
          />

          <label>Category</label>
          <input 
            type="text"
            placeholder="meat, vegetable, soup, ..."
            onChange={(event) => {
              setDishCategory(event.target.value);
            }}
          />

          <label>Ingredients</label>
          <input 
            type="text"
            placeholder="salt, pepper, ..."
            onChange={(event) => {
              setDishIngredients(event.target.value);
            }}
          />

          <label>Steps</label>
          <textarea 
            placeholder="Write steps here..."
            onChange={(event) => {
              setDishSteps(event.target.value);
            }}
          />

          <button onClick={addDish}>Add Dish</button>
        </div>
      </div>

      <div className="container" id="right-container">
        {showList.map((val, key) => {
          return (
            <Collapsible title={val.dish_name} category={val.dish_category}>
              <div className="ingredients">
                <p className="heading">Ingredients:</p>
                <p>{val.dish_ingredients}</p>
              </div>
              <div className="steps">
                <p className="heading">Steps:</p>
                <p>{val.dish_steps}</p>
              </div>
              <div className="buttons">
                <button id="update-btn">Update</button>
                <button id="delete-btn" onClick={() => deleteDish(val.id)}>Delete</button>
              </div>
            </Collapsible>);
        })}
      </div>
        
    </div>
  );
}

export default App;
