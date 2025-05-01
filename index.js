const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');


const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const foodRoute = require('./routes/food');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const orderFoodRoute = require('./routes/foodOrder');
const paymentRoute = require('./routes/stripe');


const mongoose = require('mongoose');


dotenv.config();


// Increase the payload size limit
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));


mongoose.connect(process.env.MONGO_URL )
.then(()=>{console.log('DBConnection successfully up');})
.catch((err)=>{console.log(err);});

const allowedOrigins = [
  "http://localhost:3000",
  "https://retail-ruddy.vercel.app"
];

app.use(cors(
  {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }
));
//create an API
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/auth',authRoute);
app.use('/api/products',productRoute);
app.use('/api/foods',foodRoute);
app.use('/api/carts',cartRoute);
app.use('/api/orders',orderRoute);
app.use('/api/foodOrders',orderFoodRoute);
app.use('/api/checkout',paymentRoute);


app.listen(process.env.PORT || 5000,()=>{
  console.log('Backend server started');
  });