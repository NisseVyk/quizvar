const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const table = "bollar"

app.use(cors({ origin: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let db = new sqlite3.Database('./db.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
    });


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('public/index.html' , { root : __dirname})
    res.sendFile('public/createTest.html' , { root : __dirname})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.post('/send', (req, res) => {
    db.serialize(() => {
      try{
        db.run(`CREATE TABLE ${req.body["table"]} (id int not null, alt1 text not null, alt2 text not null)`);
        db.run(`INSERT INTO ${req.body["table"]}(id, alt1, alt2) VALUES(1, ?, ?)`, [`${req.body["name"][0][0]}`, `${req.body["name"][1][1]}`]);
      } catch (error) {
        console.log(error)
      }
    });
    res.send('200')
  })
