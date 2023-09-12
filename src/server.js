require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const { passport } = require('./middleware/auth');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/newsPosts', require('./routes/api/newsPosts'));

// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
