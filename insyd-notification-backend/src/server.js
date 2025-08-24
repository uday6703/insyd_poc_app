require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://insyd-poc-app.netlify.app', // Your Netlify domain
    'http://localhost:5173'  // Vite dev server
  ],
  credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Notification/event routes
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/', notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
