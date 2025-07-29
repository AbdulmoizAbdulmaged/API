const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// const io = require('socket.io')(process.env.CHAT_PORT || 4000, {
//   cors: {
//     origin: "http://localhost:3000",
  
//   }
// });
//  io.on('connection', (socket) => {
//   console.log(`New client connected: ${socket.id}`);

//   // Join the room for the order
//   socket.on('joinRoom', (orderId) => {
//     socket.join(orderId);
//     console.log(`Socket ${socket.id} joined room ${orderId}`);
//   });

//   // Handle sending a chat message
//   socket.on('chatMessage', ({ orderId, sender, message }) => {
//     console.log(`Room ${orderId} | ${sender}: ${message}`);

//     // Only emit to users in this order's room
//     io.to(orderId).emit('chatMessage', { sender, message });
//   });

//   socket.on('disconnect', () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });



const cors = require('cors');
const http = require('http'); // Add this
const { Server } = require('socket.io'); // Add this









//serve static files from the public directory
app.use(express.static(__dirname + '/public')); 


//keeping track of online users





const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const foodRoute = require('./routes/food');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const orderFoodRoute = require('./routes/foodOrder');
const paymentRoute = require('./routes/stripe');
const loyaltyRoute = require('./routes/loyalty');
const deliveryAppRoute = require('./routes/deliveryApp') // Import the loyalty route


const mongoose = require('mongoose');





// Increase the payload size limit
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));


mongoose.connect(process.env.MONGO_URL )
.then(()=>{console.log('DBConnection successfully up');})
.catch((err)=>{console.log(err);});

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5000",
      "https://retail-ruddy.vercel.app",
      "https://retail-git-main-abdulmoiz-abdulmageds-projects.vercel.app",
      "https://www.r9retail.com",
      "https://admin-sand-one.vercel.app"
    ],
    credentials: true
  }
});

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "http://localhost:5000",
//   "https://retail-ruddy.vercel.app",
//   "https://retail-git-main-abdulmoiz-abdulmageds-projects.vercel.app",
//   "https://www.r9retail.com",
//   "https://admin-sand-one.vercel.app", //https://admin-sand-one.vercel.app/
// ];

// app.use(cors(
//   {
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true
//   }
// ));
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
app.use('/api/loyalty', loyaltyRoute); // Use the loyalty route
app.use('/api/appSetting', deliveryAppRoute); // Use the delivery app route


// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});


 io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Join the room for the order
  socket.on('joinRoom', (orderId) => {
    socket.join(orderId);
    console.log(`Socket ${socket.id} joined room ${orderId}`);
  });

  // Handle sending a chat message
  socket.on('chatMessage', ({ orderId, sender, message }) => {
    console.log(`Room ${orderId} | ${sender}: ${message}`);

    // Only emit to users in this order's room
    io.to(orderId).emit('chatMessage', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});


// Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Backend server started on port ${PORT}`);
// });
server.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server started on port ${process.env.PORT || 5000}`);
});
