const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db');

const app = express();

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const cartRoutes = require('./routes/cart')

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDatabase();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/users', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});