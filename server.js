const express = require('express');
const mongoose = require('mongoose');
const Item = require('./itemSearch');
const port = 3000;

// *NOTE* Figure out why db.once isn't running!!
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => {console.log('Connected to Mongoose')});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/getItem', (req, res) => {
  let payload = re.body.payload.trim();
  console.log(payload);
})

// Start the server and listen on specified port (3000)
app.listen(process.env.PORT || port, () => {
  console.log('Server has started on PORT ' + port);
});
