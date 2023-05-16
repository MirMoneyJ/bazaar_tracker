const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Item = require('./itemSearch');
const LootItem = require('./lootItemSearch');

// Secret key for JWT
const JWT_SECRET = 'xs45g93wbtq6i8wef0qw87weo8&(^GVY%G64rb8q7';

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const port = 3000;

const app = express(); // Create Express application

// Create a MongoDB connection object and log any errors
const db = mongoose.connection;
db.on('error', error => console.log(error));

// Once the connection is open, log that we've connected to Mongoose
db.once('open', () => {
  console.log('Connected to Mongoose')
});

// Set view engine to ejs
app.set('view engine', 'ejs');

// Serve static files for signup page
app.use('/signupPage', express.static(path.join(__dirname, 'views')));

// Middleware for parsing JSON bodies, URL-encoded request, and
// server static files from the 'public' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route for changing password
app.post('/api/change-password', async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body; // Extract town and new password from req body

  if(!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({status: 'error', error: 'Invalid password'});
  }

  if(plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be at lease 6 characters.'
    })
  }

  try {
    // Verify the JWT token and extract the user ID
    const user = jwt.verify(token, JWT_SECRET);
    const _id = user.id;
    
    // Has the new password and update the users password in database
    const password = await bcrypt.hash(plainTextPassword, 10);
;    await User.updateOne(
      {_id}, 
      {
        $set: { password }
    })
    res.json({ status: 'ok' })
  } catch(error) {
    console.log(error);
    res.json({ status: 'error', error: ';))' })
  }
})

// Route for user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if(!user) {
    return res.json({ status: 'error', error: 'Invalid username/password'})
  }

  // Compare the provided password with the hased password stored in DB
  const passwordMatch = await bcrypt.compare(password, user.password);

  if(passwordMatch) {
    // the username, password combination is successful

    // Generate a JSON web token (JWT) with user ID and username as a payload
    const token = jwt.sign({ 
      id: user._id, 
      username: user.username 
    }, 
    JWT_SECRET 
    )

    return res.json({ status: 'ok', data: token})
  }

  res.json({status: 'error', error: 'Invalid username/password' });
})

// Route for user registration
app.post('/api/register', async (req, res) => {
  const { username, password: plainTextPassword } = req.body;
  
  if(!username || typeof username !== 'string') {
    return res.json({status: 'error', error: 'Invalid username'});
  }

  if(!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({status: 'error', error: 'Invalid password'});
  }

  if(plainTextPassword.length < 5) {
    return res.json({
      status: 'error',
      error: 'Password too small. Should be at lease 6 characters.'
    })
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created successfully: ', response);
  } catch(error) {
    if(error.code === 11000) {
      //duplicate key
      return res.json({ status: 'error', error: 'Username already in use' });
    }
    throw error;
  }

  console.log(await bcrypt.hash(password, 10));

  res.json({ status: 'ok' });
})

// Handles POST requests to the "/getItem" endpoint
app.post('/getItem', async (req, res) => {
  // Searches for items whose name matches the search term
  let payload = req.body.payload.trim();
  let search = await Item.find({name: {$regex: new RegExp('^' + req.body.payload + '.*', 'i' )}}).exec();
  // Limits search results to 10
  search = search.slice(0, 10);
  res.send({payload: search});
});

// Handles POST requests to the "/getLootItem" endpoint
app.post('/getLootItem', async (req, res) => {
  // Searches for loot items whose name matches the search term
  let payload = req.body.payload.trim();
  let search = await LootItem.find({items_name: {$regex: new RegExp('^' + req.body.payload + '.*', 'i' )}}).exec();
  // Limits search results to 10
  search = search.slice(0, 10);
  res.send({payload: search});
});

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'loginPage.html'));
});

// Route for signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signupPage.html'));
});

// Send the index page when the user accesses the /index URL
app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html')); // use path.join to join the path
});

app.get('/change-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'change-password.html'));
});

// Handles GET requests to the "/item/:itemName" endpoint
app.get('/item/:itemName', async (req, res) => {
  // Finds the item with the given name
  const itemName = req.params.itemName;
  const items = await Item.find({name: itemName}).exec();
  const item = items.length > 0 ? items[0] : {};
  res.render('itemName', { itemName, item });
});

// Handles GET requests to the "/loot/:lootItemName" endpoint
app.get('/loot/:lootItemName', async (req, res) => {
  // Finds the loot item with the given name
  const lootItemName = req.params.lootItemName;
  const items = await LootItem.find({items_name: lootItemName}).exec();
  const item = items.length > 0 ? items[0] : {};
  res.render('lootItemName', { lootItemName, item });
});

app.listen(port, () => {
  console.log('Server has started on port ' + port);
})
