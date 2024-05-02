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
        let quiz_name = req.body["table"]
        db.run(`CREATE TABLE ${req.body["table"]} (term text not null, definition text not null)`);
        /*db.each(`SELECT name FROM sqlite_master WHERE type=’table’;`, function(err, table) {
          console.log(err)
          console.log(table)
        });*/
        let term_list = req.body["term_list"]
        for(i=0; i<term_list.length; i++){
          db.run(`INSERT INTO ${req.body["table"]}(term, definition) VALUES(?, ?)`, [`${term_list[i][0]}`, `${term_list[i][1]}`]);
        }
        
      } catch (error) {
        console.log(error)
      }
    });
    res.send('200')
  })
