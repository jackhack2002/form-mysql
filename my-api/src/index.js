const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ANGULAR',
  password: 'jacob',
  database: 'student_form'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

function createRouter(db) {
  const router = express.Router();

  // POST route to insert data into the database
  router.post('/besant_form', (req, res) => {
    const { name, mobile, emailId, DOB,age, physics, chemistry, mathematics, total, avg_percentage } = req.body;

    // Format date of birth if necessary
    // const formattedDOB = formatDOB(Date_of_birth); // Implement formatDOB function as needed

    const sql = `INSERT INTO besant_form (name, mobile, emailId, DOB,age, physics, chemistry, mathematics, total, avg_percentage) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, mobile, emailId, DOB,age, physics, chemistry, mathematics, total, avg_percentage];

    db.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error inserting student into database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ message: 'Student created successfully' });
    });
  });

  // GET route to fetch data by mobile number
  router.get('/besant_form', (req, res) => {
    const mobile = req.query.mobile;

    const sql = `SELECT * FROM besant_form WHERE mobile = ?`;
    db.query(sql, [mobile], (error, results, fields) => {
      if (error) {
        console.error('Error fetching student data from database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json(results);
    });
  });

  return router;
}

app.use(createRouter(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});




// create table besant_form (id int,name varchar(50),mobile bigint,emailid varchar(50),DOB date,age int,physics int,chemistry int,mathematics int,total int,avg_percentage float,primary key(id));
