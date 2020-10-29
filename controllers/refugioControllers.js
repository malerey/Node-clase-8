const Refugio = require('../models/refugios');
const sort = require('../utils/sort');

exports.getRefugios = async (req, res) => {
  try {

    const { query, page } = sort(req, 'refugios')
    const refugios = await query.populate({
      path: 'gatitos',
      select: '-__v -_id'
    });

    res.status(201).json({
      status: 'success',
      data: {
        page: page,
        refugios,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.getRefugio = async (req, res) => {
  try {
    const refugios = await Refugio.findById(req.params.id).populate('gatitos').populate('reviews');
    res.status(201).json({
      status: 'success',
      data: {
        refugios,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};
// exports.postRefugio = (req, res) => {
//   const refugio = new Refugio(req.body)

//   refugio.save()
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

exports.postRefugio = async (req, res) => {
  try {
    const refugio = await Refugio.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        refugio,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.deleteRefugio = async (req, res) => {
  try {
    // este es el metodo de mongoose, equivalente
    // await Refugio.findByIdAndDelete(req.params.id)
    await Refugio.deleteOne({ _id: req.params.id });
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

exports.putRefugio = async (req, res) => {
  try {
    const refugio = await Refugio.replaceOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        refugio,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchRefugio = async (req, res) => {
  try {
    const refugio = await Refugio.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        refugio,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
