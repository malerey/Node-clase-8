const Adoptante = require('../models/adoptantes');
const sort = require('../utils/sort');

exports.getAdoptantes = async (req, res) => {
  try {

    const { query, page } = sort(req, 'adoptantes')
    const adoptantes = await query;

    res.status(201).json({
      status: 'success',
      data: {
        page: page,
        adoptantes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.getAdoptante = async (req, res) => {
  try {
    // metodo de mongo
    // const adoptantes = await Adoptante.findOne({_id: req.params.id})
    // metodo de mongoose
    const adoptantes = await Adoptante.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        adoptantes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};
// exports.postAdoptante = (req, res) => {
//   const adoptante = new Adoptante(req.body)

//   adoptante.save()
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

exports.postAdoptante = async (req, res) => {
  try {
    // una manera de hacerlo:
    // const adoptante = new Adoptante(req.body)
    // await adoptante.save()

    // otra, mas breve:
    const adoptante = await Adoptante.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        adoptante,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.deleteAdoptante = async (req, res) => {
  try {
    // este es el metodo de mongoose, equivalente
    // await Adoptante.findByIdAndDelete(req.params.id)
    await Adoptante.deleteOne({ _id: req.params.id });
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

exports.putAdoptante = async (req, res) => {
  try {
    const adoptante = await Adoptante.replaceOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        adoptante,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchAdoptante = async (req, res) => {
  try {
    const adoptante = await Adoptante.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        adoptante,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
