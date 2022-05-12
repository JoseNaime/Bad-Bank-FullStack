require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open');
});

// Import routes
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));


// Comment listener for testing

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port ' + (process.env.PORT || 3000));
});


// export for testing
// module.exports = app;