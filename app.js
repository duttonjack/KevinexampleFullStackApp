import express from 'express';
import path from 'path';
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;
const app = express();

const expressPort = 8003;
const connectionString = process.env.DATABASE_URL  

const pool = new Pool ({
  connectionString,
})

// const databaseURL = process.env.PG_DATABASE_URL;

// console.log(databaseURL);

// const pool = new Pool ({
//   connectionString: databaseURL,
// });

app.use(express.static('public'));
app.use(express.json());

app.get('/items', (req,res) => {
  pool.query('SELECT * FROM items')
    .then((data) => res.send(data.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).send("Sorry!");
    })
});


app.listen(expressPort, () => {
  console.log(`Listening on port ${expressPort}...`);
})