const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

// Importing routes
const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('DB CONNECTED')
);

// middlewares
// to parse the body-json -> work as body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes for the /post
app.use('/posts', postRoutes);

// Routes
app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome</h1><a href="/posts">Get Posts</a>');
});

// to get all posible routes other from '/' and '/posts'
app.all('*', (req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(5000, () => console.log(`listening at http://localhost:5000/`));
