const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      data: 'Por favor envie un pasword y un email',
    });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(200).json({
      status: 'fail',
      data: 'Usuario no encontrado',
    });
  }

  let passwordDB = user.password;

  const passwordCheck = await bcrypt.compare(password, passwordDB);
  if (passwordCheck) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.status(200).json({
      status: 'success',
      token,
    });
  } else {
    res.status(400).json({
      status: 'fail',
      data: 'Password incorrecto',
    });
  }
};


exports.protectRoute = async (req, res, next) => {

let token = ''
  if (!req.headers.authorization) {
    res.send(401).json({
      status: 'fail',
      message: 'Debe enviar un token'
    })
  }
  else {
    token = req.headers.authorization.split(" ")[1]
  }
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).json({
        status: 'fail',
        message: 'Token invalido'
      })
    }
    let user = await User.findOne({_id: decoded.id }).select('+role')
    req.user = user
    next();
  })
  
} 


exports.onlyAdmin = (req, res, next) => {
    if (!req.user.role || req.user.role !== 'admin' ) {
      res.status(401).json({
        status: 'fail',
        message: 'No estas autorizado a realizar esta accion'
      })
    }
  next();
}
