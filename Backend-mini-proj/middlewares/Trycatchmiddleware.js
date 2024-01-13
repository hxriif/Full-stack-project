const TrycatchMiddleware = (TrycatchHandler) => {
  return async (req, res, next) => {
    try {
      await TrycatchHandler(req, res, next);   
      next();
    } catch (error) {
      return res.status(500).json({    
        status: "failure",   
        message: "error",  
        error_message: error.message,
      });
    }
  };
};
module.exports = TrycatchMiddleware;
