Live Search for Craftable Items 

This project is a live search feature that retrieves
items from a MongoDB database based on user input. 
If a user types a key-stroke, any item that starts with
that letter will appear on the screen. This project also
includes a login/register system to where the user has the
ability to create an account, change passwords, and login.

Technologies Used
- MongoDB
- Mongoose
- Express
- Node.js 
- HTML
- CSS 

Prerequisties 
- Node.js and npm should be installed.
- npm install mongoose, express, jsonwebtoken

Installation Instructions

1. Clone the repository from GitHub https://github.com/MirMoneyJ/bazaar_tracker. 
2. Do a Mongorestore to get items and inserts from database (mongorestore --nsInclude=myDatabase.* dump/)
3. Navigate to the project directory and run 
   'node server.js'

Usage

1. Open your web broswer and navigate to 'http://localhost:3000'
2. Click 'Start Tracking'
3. Type in the name of the item you're search for.
4. Results matching your search query will be displayed on screen.

Code Explanation

server.js:

This file sets up a connection to a local MongoDB database
and creates an Express app that handles JSON and URL-encoded data.
The root url for the application sends the 'index.html' and 'homePage.html'
file located in a directory call 'views'

itemSearch.js & lootItemSearch.js:

Files define the schemas for a craftableItem, a lootItem, and exports the models.

login.html:

File allows the user to either long, make an account, or change passwords.

signupPage.html:

File allows the user to create an account. That acocunt is then saved in the Database

index.html:

File creates an input field where the user can type in the name
of the item they're looking for. As the user types, a JS function named
'sendData' is triggered, which sends a POST request to the '/getItem' 
and retrives the items from the database.
