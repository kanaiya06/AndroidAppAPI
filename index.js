const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection to the database

const db = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5728684',
  password: 'jcne6GmW92',
  database: 'sql5728684'

  // host: 'sql102.infinityfree.com',
  // user: 'if0_37195773',
  // password: 'Fdcd7AsdtkZe',
  // database: 'if0_37195773_test1'

  // host: 'localhost',
  // user: 'root',
  // password: 'root',
  // database: 'testdb'
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
    const { Username, Password } = req.query;
  
    if (!Username || !Password) {
      return res.status(400).send('Query parameters u1 and u2 are required');
    }
  
    const sqlQuery = 'SELECT * FROM logs WHERE uname=? AND pass=?';
    db.query(sqlQuery, [Username, Password], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });


  app.get('/OrderDetails', (req, res) => {
    const sqlQuery = 'SELECT * FROM orderdetails';
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });


app.get('/Client', (req, res) => {
    const sqlQuery = 'SELECT * FROM client';
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });
  
  app.get('/Product', (req, res) => {
    const sqlQuery = 'SELECT * FROM product';
    db.query(sqlQuery, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.get('/ProductSearch', (req, res) => {
    const {lpid}=req.query;
    const sqlQuery = 'SELECT * FROM product where PID = ?';
    db.query(sqlQuery,[lpid] ,(err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.get('/Search', (req, res) => {
    const { CSearch } = req.query;

    const sqlQuery = 'SELECT * FROM client where Cfname like ?';
    db.query(sqlQuery,[CSearch] ,(err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

app.get('/OrderSearch', (req, res) => {
    const { OSearch } = req.query;

    const sqlQuery = 'SELECT * FROM orderdetails where Cid like ?';
    db.query(sqlQuery,[OSearch] ,(err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.use(express.json());

  app.get('/PtSearch', (req, res) => {
    const { PSearch } = req.query;

    const sqlQuery = 'SELECT * FROM product where Pname like ?';
    db.query(sqlQuery,[PSearch] ,(err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.post('/Addclient', (req, res) => {
    const { lCfname, lClname, lCaddress, lCphoneno } = req.body;

    const sqlQuery = 'INSERT INTO client (Cfname, Clname, Caddress, Cphoneno) '+
                     'Values (?,?,?,?)'
    db.query(sqlQuery,[lCfname, lClname, lCaddress, lCphoneno] ,(err, results) => {
      if (err) {
        console.error('Error Inserting data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

app.get('/GetCdata', (req, res) => {
    const { lCid } = req.query;

    const sqlQuery = 'SELECT * FROM client where CID=?';
    db.query(sqlQuery,[lCid] ,(err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

  app.put('/UpdateClient', (req, res) => {
    const { lCid} =req.query;
    const { lCfname, lClname, lCaddress, lCphoneno } = req.body;
    const sqlQuery = 'UPDATE client SET Cfname=?, Clname=?, Caddress=?, Cphoneno=? where CID=?';
    db.query(sqlQuery,[lCfname, lClname, lCaddress, lCphoneno,lCid] ,(err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });

app.post('/PlaceOrder', (req, res) => {
    const { lCid, lpid, lpname, lqty,lrate,ltprice } = req.body;
    let sqlQuery = 'INSERT INTO orderdetails (Cid, Pid, pname, Qty, Rate, Tprice) '+
                     'Values (?,?,?,?,?,?)';
    db.query(sqlQuery,[lCid, lpid, lpname, lqty,lrate,ltprice] ,(err, results) => {
      if (err) {
        console.error('Error Inserting data:', err);
        res.status(500).send('Server error');
        return;
      }
    sqlQuery = 'Update product set Avqt=Avqt-? where PID=?';
    db.query(sqlQuery,[ lqty, lpid] ,(err,updateResults) => {
      if (err) {
        console.error('Error Inserting data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json({ orderResults: results, updateResults });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running!`);
});