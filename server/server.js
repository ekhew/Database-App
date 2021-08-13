const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

//connect to MySQL database
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'employee_system'
});

//create; post request route
app.post('/create', (req, res) => {

    //get information from the Axios post request in the client side
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const salary = req.body.salary;

    //database query
    const postQuery = 'INSERT INTO employees (name, age, country, position, salary) VALUES (?,?,?,?,?)';

    db.query(postQuery, [name, age, country, position, salary], (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send("Values Inserted!");
            }
        }
    );
});

//read; get request route
app.get('/get-all', (req, res) => {

    //database query
    const getQuery = 'SELECT * FROM employees';

    db.query(getQuery, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//read; get request route
app.get('/search/:name', (req, res) => {

    const name = req.params.name;

    //database query
    const getQuery = 'SELECT * FROM employees WHERE name = ?';

    db.query(getQuery, name, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//delete; delete request route
app.delete(('/delete/:id'), (req, res) => {
    const id = req.params.id;

    const deleteQuery = 'DELETE FROM employees WHERE id = ?';

    db.query(deleteQuery, id, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001.");
});