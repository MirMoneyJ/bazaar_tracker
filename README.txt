Live Search for Craftable Items 

This project is a live search feature that retrieves
items from a MongoDB database based on user input. 
If a user types a key-stroke, any item that starts with
that letter will appear on the screen.

Technologies Used
- MongoDB
- Mongoose
- Express
- Node.js 
- HTML
- CSS 

Prerequisties 
- Node.js and npm should be installed.
- npm install mongoose
- npm install express

Installation Instructions

1. Clone the repository from GitHub https://github.com/MirMoneyJ/bazaar_tracker. 
2. Type in 'mongosh' in the terminal and
   create a new database named myDatabase.
3. Look in the 'other' folder and you'll 
   see 'itemSchema.txt' open and copy the contents.   
4. In your database terminal paste the itemSchema.
   (This is creating a collection called craftableItems and defining the Schema).
5. Look in the 'other' folder and you'll 
   see 'inserts.txt' copy the inserts and paste into database terminal.
   (This is the data we'll be using for get info)
6. Navigate to the project directory and run 
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

The '/getItem' endpoint handles POST request and retrives items
from the database. Those retreived items are then returned to
the client as a JSON payload.

itsemSearch.js:

File defines the schema for a craftableItem and exports the model.

index.html:

File creates an input field where the user can type in the name
of the item they're looking for. As the user types, a JS function named
'sendData' is triggered, which sends a POST request to the '/getItem' 
and retrives the items from the database.
