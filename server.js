const app = require('./app');
const mongoose = require('mongoose');

const port = 8080;

// mongoose.connect('mongodb://localhost:27017/', { dbName: 'ada'}, 
// err => (err ? console.log(err) : console.log('Conectado a la base de datos')))

mongoose.connect('mongodb+srv://malerey:<password>@cluster0.r5o6h.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(con => console.log('Conexion a MongoDB Atlas exitosa'))

app.listen(port, () => {
  console.log(`App esta corriendo en el puerto ${port}`);
});
