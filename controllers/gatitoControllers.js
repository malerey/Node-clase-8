const { get } = require('mongoose');
const Gatito = require('../models/gatitos');

exports.getGatitos = async (req, res) => {
  try {

    // ** Filtrado avanzado

    // Excluir valores de busqueda
    const queryObj = { ...req.query };
    const camposExcluidos = ['page', 'limite', 'ordenar'];
    camposExcluidos.forEach(el => delete queryObj[el]);

    // Filtrado con operadores 
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/gte|lte/g, match => `$${match}`)
    let query = Gatito.find(JSON.parse(queryStr));

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


    // mongo
    //    const gatitos = await Gatito.find(queryObj);
    // mongoose
    // const gatitos = await Gatito.find()
    // .where('edad')
    // .gte(5)
    // .where('nombre')
    // .equals('trufa')
    // .where('disponible')
    // .equals(true)

    const gatitos = await query;

    res.status(201).json({
      status: 'success',
      data: {
        page: page,
        gatitos,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.getGatito = async (req, res) => {
  try {
    // metodo de mongo
    // const gatitos = await Gatito.findOne({_id: req.params.id})
    // metodo de mongoose
    const gatitos = await Gatito.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        gatitos,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};
// exports.postGatito = (req, res) => {
//   const gatito = new Gatito(req.body)

//   gatito.save()
//   .then(doc => {
//     return res.status(200).json({
//     status: 'success',
//     data: doc
//   })
// })
//   .catch(err => {
//     return res.status(500).json({
//       status: 'fail',
//       err: err
//     })
//   })
// };

exports.postGatito = async (req, res) => {
  try {
    // una manera de hacerlo:
    // const gatito = new Gatito(req.body)
    // await gatito.save()

    // otra, mas breve:
    const gatito = await Gatito.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        gatito,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.deleteGatito = async (req, res) => {
  try {
    // este es el metodo de mongoose, equivalente
    // await Gatito.findByIdAndDelete(req.params.id)
    await Gatito.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'No se pudo borrar al gato',
    });
  }
};

exports.putGatito = async (req, res) => {
  try {
    const gatito = await Gatito.replaceOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        gatito,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchGatito = async (req, res) => {
  try {
    const gatito = await Gatito.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        gatito,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
