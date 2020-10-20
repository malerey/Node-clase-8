const User = require('../models/users');

exports.getUsers = async (req, res) => {
  try {

    // ** Filtrado avanzado

    // Excluir valores de busqueda
    const queryObj = { ...req.query };
    const camposExcluidos = ['page', 'limite', 'ordenar'];
    camposExcluidos.forEach(el => delete queryObj[el]);

    // Filtrado con operadores 
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/gte|lte/g, match => `$${match}`)
    let query = User.find(JSON.parse(queryStr));

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

    const users = await query;

    res.status(201).json({
      status: 'success',
      data: {
        page: page,
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
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

exports.putUser = async (req, res) => {
  try {
    const user = await User.replaceOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
