/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require('dotenv').config(); //load env variables
const express = require('express');
const cors = require('cors');
const userRouter = require('./controllers/user');
const todoRouter = require('./controllers/todo');

// initialize the express application to a variable called app
const app = express(); 


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());


////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/users', userRouter);
app.use('/todo', todoRouter);
app.get('/', async (req, res) => {
    try {
        res.send('hello world');
    } catch (err) {
        res.status(400).json(err);
    }
});


// have the express application which is in the variable called app 
// run on the PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Now listening to port: ${PORT}`);
});