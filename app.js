const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const table = "bollar"

let quiz_list = []

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
    quiz_list = []
    quiz = "quiz"
        try{
          db.each(`SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;`, function(err, table) {
            quiz_list.push(table["name"])
            return;
          });
          setTimeout(createTable, 1000)
        } catch (error) {
          console.log(error)
        }
    
      function createTable(){
        db.run(`CREATE TABLE ${quiz + quiz_list.length.toString()} (name text not null, term text not null, definition text not null)`);

        let quiz_name = req.body["table"]
        let term_list = req.body["term_list"]
        db.serialize(() => {
          for(i=0; i<term_list.length; i++){
            db.run(`INSERT INTO ${quiz + quiz_list.length.toString()}(name, term, definition) VALUES(?, ?, ?)`, [`${quiz_name}`, `${term_list[i][0]}`, `${term_list[i][1]}`]);
          }
        })
        
      }
      
    
    res.send('200')
  })

app.get('/tables', (req, res) => {
  quiz_list = []
  try{
    db.each(`SELECT name FROM sqlite_schema WHERE type='table' ORDER BY name;`, function(err, table) {
      quiz_list.push(table["name"])
      return;
    });
  } catch (error) {
      console.log(error)
    }
  setTimeout(send, 1000)

  
  function send() {
    console.log(quiz_list)
    res.send(quiz_list)
  }
  
})