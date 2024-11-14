const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');


const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const paymentRoute = require('./routes/stripe');


const mongoose = require('mongoose');


dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('DBConnection successfully up');})
.catch((err)=>{console.log(err);});

app.use(cors());
//create an API
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth',authRoute);
app.use('/api/products',productRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/api/checkout',paymentRoute);


app.listen(process.env.PORT || 5000,()=>{
console.log('Backend server started');
});