const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const gatitoRouter = require('./routes/gatitoRoutes');

const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/gatitos', gatitoRouter)
app.use('/users', userRouter);

module.exports = app;



