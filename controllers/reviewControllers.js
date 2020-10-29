const Review = require('../models/reviews');
const sort = require('../utils/sort');

exports.getReviews = async (req, res) => {
  try {
    const { query, page } = sort(req, 'reviews')
    const reviews = await query;

    res.status(201).json({
      status: 'success',
      data: {
        page: page,
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.findById(req.params.id)
    res.status(201).json({
      status: 'success',
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.postReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err: err,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.id });
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

exports.putReview = async (req, res) => {
  try {
    const review = await Review.replaceOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
