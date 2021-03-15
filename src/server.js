const result = require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');


app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);
app.use('/', fileRoutes);

app.listen(port, () => {
    console.log("Start listening");
})
