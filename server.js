const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT;

// mongoose.connect('mongodb://localhost:27017/', { dbName: 'ada'}, 
// err => (err ? console.log(err) : console.log('Conectado a la base de datos')))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.r5o6h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(con => console.log('Conexion a MongoDB Atlas exitosa'))

app.listen(port, () => {
  console.log(`App esta corriendo en el puerto ${port}`);
});
