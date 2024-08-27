const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection to the database

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12727158',
  password: 'VnNFj5JmbK',
  database: 'sql12727158'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define a route to get all records from a table
app.get('/data', (req, res) => {
    const { u1, u2 } = req.query;
  
    if (!u1 || !u2) {
      return res.status(400).send('Query parameters u1 and u2 are required');
    }
  
    const sqlQuery = 'SELECT * FROM logs WHERE uname=? AND pass=?';
    db.query(sqlQuery, [u1, u2], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});