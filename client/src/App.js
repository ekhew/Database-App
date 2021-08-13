import './App.css';
import React, {useState} from 'react';
import Axios from 'axios';
import Collapsible from './components/Collapsible'

function App() {

  //'App' function component states used to store user input
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [searchName, setSearchName] = useState("");

  //create; post request
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name, 
      age: age, 
      country: country,
      position: position,
      salary: salary
    }).then(() => {
      getAllEmployees();
    });
  };

  //read; get request
  const getAllEmployees = () => {
    Axios.get('http://localhost:3001/get-all').then((response) => {
      setEmployeeList(response.data);
    });
  };

  //read; get request
  const searchEmployees = (name) => {
    Axios.get(`http://localhost:3001/search/${name}`).then((response) => {
      setEmployeeList(response.data);
    });
  };

  //delete; delete request
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setEmployeeList(employeeList.filter((val) => {
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
        <label>Search Here</label>
          <input 
            type="text"
            onChange={(event) => {
              setSearchName(event.target.value);
            }}
          />
          <button onClick={() => searchEmployees(searchName)}>Search</button>
          <button onClick={getAllEmployees}>Show All</button>
        </div>

        <div className="add-section">
          <label>Name</label>
          <input 
            type="text" 
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <label>Age</label>
          <input 
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />

          <label>Country</label>
          <input 
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />

          <label>Position</label>
          <input 
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />

          <label>Salary (Yearly)</label>
          <input 
            type="number"
            onChange={(event) => {
              setSalary(event.target.value);
            }}
          />

          <button onClick={addEmployee}>Add Employee</button>
        </div>
      </div>

      <div className="container" id="right-container">
        {employeeList.map((val, key) => {
          return (
            <Collapsible title={val.name}>
              <p>{val.age}</p>
              <p>{val.country}</p>
              <p>{val.position}</p>
              <p>Salary: ${val.salary}</p>
              <button onClick={() => deleteEmployee(val.id)}>Delete</button>
            </Collapsible>);
        })}
      </div>
        
    </div>
  );
}

export default App;
