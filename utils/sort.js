const Gatito = require('../models/gatitos');
const User = require('../models/users');

const sort = (req, collection) => {

  let searchCollection = ''
  if (collection === 'gatitos') {
    searchCollection = Gatito
  }
  else if (collection === 'users') {
    searchCollection = User
  }
  else {
    searchCollection = Gatito
  }

    // Excluir valores de busqueda
    const queryObj = { ...req.query };
    const camposExcluidos = ['page', 'limite', 'ordenar'];
    camposExcluidos.forEach(el => delete queryObj[el]);

    // Filtrado con operadores 
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/gte|lte/g, match => `$${match}`)
    let query = searchCollection.find(JSON.parse(queryStr));

    // Sorting (ordenamiento)
    if (req.query.ordenar) {
      const campos = req.query.ordenar.split(',').join(" ")
     query = query.sort(campos) 
    }
    else {
      query = query.sort("edad -nombre")
    }


    // ** Paginado **
    const page = req.query.page * 1 || 1;
    const limit = req.query.limite * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.limit(limit).skip(skip);

    return { query, page }
  }

  module.exports = sort;
