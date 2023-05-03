/*
file name: server.js
purpose: starts the server
authors: Lawrence, Ahmir, Krishna, Chic, Trent, Mya
version: 5/2/23
*/

const express = require('express');
const mongoose = require('mongoose');
const Item = require('./itemSearch');
const port = 3000;

//connecting to localdatabase named 'myDatabase'
mongoose.connect('mongodb://localhost/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {console.log('Connected to Mongoose')});

//creates an Express app and sets up middleware for handling
//JSON, URL-encoded data, and serving static files from a directory called 'public'.
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//sets up a route for the root URL of the application,
//which sends the index.html file located in a directory called 'views'.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/homePage.html');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

//sets up a route for handling POST requests to the "/getItem" endpoint.
app.post('/getItem', async (req, res) => {
  let payload = req.body.payload.trim();
  let search = await Item.find({name: {$regex: new RegExp('^' + payload + '.*', 'i' )}}).exec();
  //Limit Search Results to 10
  search = search.slice(0, 10);
  res.send({payload: search});
});

// Start the server and listen on specified port (3000)
app.listen(process.env.PORT || port, () => {
  console.log('Server has started on PORT ' + port);
});
