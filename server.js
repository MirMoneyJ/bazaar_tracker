const express = require('express');
const mongoose = require('mongoose');
const Item = require('./itemSearch');
const port = 3000;

// *NOTE* Figure out why db.once isn't running!!
mongoose.connect('mongodb://localhost/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {console.log('Connected to Mongoose')});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

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
