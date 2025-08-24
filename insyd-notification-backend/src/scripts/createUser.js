const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../../.env' });

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const user = new User({ username: 'demo_user', email: 'demo@example.com' });
    await user.save();
    console.log('User created:', user);
    mongoose.disconnect();
  })
  .catch(err => console.error('MongoDB connection error:', err));
