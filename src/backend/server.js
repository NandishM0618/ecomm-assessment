const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});