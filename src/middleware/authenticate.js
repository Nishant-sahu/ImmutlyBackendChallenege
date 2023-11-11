const authenticate = (req, res, next) => {
    const authToken = req.header('Authorization');
    if (authToken === 'ICanOnlyLogin') {
      next();
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }
  };
  
  module.exports = authenticate;