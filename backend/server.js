const express = require('express');
const path = require('path');
require('dotenv').config()
const cors  = require('cors')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

//create the web server(expressJS app)
const app = express();
app.use(cors());
app.use(express.json()); //use json parser


//Connection code 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// //http://localhost:3000/exercises
app.use('/exercises', exercisesRouter);
// //http://localhost:3000/users
app.use('/users', usersRouter);


//starts server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});