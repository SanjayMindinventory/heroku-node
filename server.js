const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// express app initialize
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

//import db config file
const dbConfig = require('./config/database.config');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Easy Notes application. Take notes quickly."})
})

require('./app/routes/note.routes')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})