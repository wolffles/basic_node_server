const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const func = require('./utility/is-empty')

const app = express();


console.log(func.isEmpty('string'));
const People = require('./models/People')
//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect to the db
mongoose.connect("mongodb://localhost:27017/practice", {useNewUrlParser: true})
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// to send static pages
app.use(express.static(path.join(__dirname, 'public')))


// basic route
// app.get('/', (req,res) => {
//   res.send('<h1> landing page!!!!!! </h1>');
// })

// send a html file not static ( will have trouble with loading js scripts in html)
// app.get('/person', (req,res) => {
//   res.sendFile(path.join(__dirname, '/public', 'person.html'));
// })

app.get('/people', (req,res) => {
  People.find()
    .then(people => {
      res.json(people)})
    .catch(err => res.send(err))
})

app.post('/updatePerson', (req, res) => {
  People.findOneAndUpdate({name: req.body.name}, {name: req.body.newName})
    .then(person => res.send(`person has been updated to ${req.body.newName}`))
    .catch(err => console.log(err))
})

app.post('/deletePerson', (req, res) => {
  People.findOneAndDelete({name: req.body.name})
    .then(person => res.json({person:person,msg: 'person has been deleted'}))
})

app.post('/addPerson', (req,res)=> {
  const newPerson = new People({
    name: req.body.name
  })
  newPerson.save().then(person => res.json(person));
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));