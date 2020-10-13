exports.checkId = (req, res, next, val) => {
  console.log(val)
  if (val > 4) return res.status(404).end('Usuario no encontrado')
  next();
}

exports.getUsers = (req, res) => {

  res.status(500).json({
    status: 'error',
    message: 'Ruta aun no implementada GET USERS',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Ruta aun no implementada GET USER',
  });
};

exports.postUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Ruta aun no implementada POST USER ',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Ruta aun no implementada DELETE USER',
  });
};

exports.putUser = (req, res) => {

  checkId(id)
  res.status(500).json({
    status: 'error',
    message: 'Ruta aun no implementada PUT USER',
  });
};
