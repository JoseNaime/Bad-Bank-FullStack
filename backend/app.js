require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());

<<<<<<< HEAD
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
=======
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    console.log("start dev server");
    mongoose.connect(process.env.MONGODB_URI)
} else {
    console.log("start test server");
    mongoose.connect(process.env.MONGODB_TESTING_URI)
}

>>>>>>> d3b5a3f1599fcb40536540656c251682aae82b42
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
});

// Import routes
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

module.exports = app;