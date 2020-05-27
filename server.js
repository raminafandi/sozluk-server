const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
// app.use('/', require('src/routes/home'));
app.use('/auth', require('./src/routes/auth'));

const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
