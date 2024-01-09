const express = require('express');
const userRouter = require('./routes/user');
const quoteRouter = require('./routes/quotes');
const connectDB = require('./config/connectDB');

const app = express();

connectDB();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, x-auth-token, Content-Type, Accept',
  );
  next();
});

app.use(express.json({ limit: '5mb', extended: true }));
app.use(
  express.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }),
);

app.use(express.json());
app.use('/users', userRouter);
app.use('/quotes', quoteRouter);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Now listening to ${PORT}`));
