const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('./db/mongo');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
