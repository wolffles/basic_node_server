const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const func = require('./utility/is-empty')

const app = express();

const People = require('./models/People')

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//connect to the db
mongoose.connect("mongodb://localhost:27017/practice", {useNewUrlParser: true})
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));
mongoose.set('useFindAndModify', false);

// to serve static pages (URL is the name of the file ex: person.html)
app.use(express.static(path.join(__dirname, 'public')))

// config to serve dynamic pages
app.set("views", path.join(__dirname, "public", "static"));
app.set("view engine", "ejs");

// basic route
app.get('/', (req,res) => {
  res.send('<h1> landing page!!!!!! </h1>');
})

// send a html file not static ( will have trouble with loading js scripts in html)
// app.get('/person', (req,res) => {
//   res.sendFile(path.join(__dirname, '/public', 'person.html'));
// })

// --------------- VIEWS ROUTES ---------------------
app.get('/person', (req,res)=>{
  res.render('person.ejs', {people: []})
})

app.get('/redirect', (req,res)=>{
  res.redirect("/person")
})
app.get('/sample', (req,res)=>{
  console.log()
  res.send("hello")
})

app.get('/storage', (req,res) => {
  res.render('storage.ejs')
})


// ---------------- API ROUTES -----------------------

app.get('/people', (req,res) => {
  People.find()
    .then(people => {
      res.json(people)})
    .catch(err => res.send(err))
})

app.post('/updatePerson', (req, res) => {
  People.findOneAndUpdate({name: req.body.name}, {name: req.body.newName})
    .then(person => res.json({msg:`person has been updated to ${req.body.newName}`}))
    .catch(err => console.log(err))
})

app.post('/deletePerson', (req, res) => {
  People.findOneAndDelete({ name: req.body.name })
    .then(person => res.json({ msg: "person has been deleted" }))
    .catch(err => res.send(err));
})

app.post('/addPerson', (req,res)=> {
  const newPerson = new People({
    name: req.body.name
  })
  newPerson.save().then(person => res.json(person));
})

// ---------------------- END API ROUTES --------------------------


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app
