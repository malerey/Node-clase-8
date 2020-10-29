const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const gatitoRouter = require('./routes/gatitoRoutes');
const adoptanteRouter = require('./routes/adoptanteRoutes');
const refugioRouter = require('./routes/refugioRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express()

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/refugios', refugioRouter)
app.use('/reviews', reviewRouter)
app.use('/gatitos', gatitoRouter)
app.use('/adoptantes', adoptanteRouter)
app.use('/users', userRouter);

module.exports = app;



