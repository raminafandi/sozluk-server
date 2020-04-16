const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

//Routes
app.use('/', require('src/routes/home'));
app.use('/auth', require('src/routes/auth'));
