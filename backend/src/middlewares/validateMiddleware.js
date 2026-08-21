const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación en la petición',
        errors: errorDetails
      });
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;