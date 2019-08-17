const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.Port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected successfully');
}).once('error',function(error){
    console.log('Connection error has occured',error);
});

const exercisesRouter = require ('./routes/exercise');
const usersRouter = require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
  }
  
app.listen(port, ()=> {
    console.log(`Server is running on port : ${port}`)
});

