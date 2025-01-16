const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/user');
const productRouter = require('./router/product');
// const paymentRouter = require('./router/payment');
const dotenv = require('dotenv');
const cors = require('cors'); 
dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.mongoURI || 'mongodb://127.0.0.1:27017/woodenFurniture';
mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/users', userRouter);
app.use('/products', productRouter);
// app.use('/payment', paymentRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});