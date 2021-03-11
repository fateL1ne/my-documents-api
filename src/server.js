const result = require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');


app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);

app.listen(port, () => {
    console.log("Start listening");
})
