const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');


const db = require('./config/config')
const cookieParser = require('cookie-parser')
const whitelist = ['http://localhost:3000']; // List of allowed origins




const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true   // Allow credentials
};





// This is defining the important configuration
const port = process.env.PORT;
const app = express();
const AuthRoute = require('./routes/auth.route');

// Get app to use the important modules
app.use(express.json()); // Use express.json() to parse JSON request bodies
app.use(cors(corsOptions));
// app.use(cors()); 
app.use(cookieParser())
app.use('/api', AuthRoute);


// Listen for a port
app.listen(port, (err) => {
  if (err) {
    console.log
    process.exit(1);
  }
  console.log("✅ app running on port / " + port);
});







