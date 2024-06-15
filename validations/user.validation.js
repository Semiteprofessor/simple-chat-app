const Joi = require("joi");

const createUserValidation = (data) => {
  const validateUser = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required,
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref("password"),
    phone: Joi.string().required(),
    address: Joi.string(),
  });
  return validateUser.validate(data);
};

const loginValidation = (data) => {
  const validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return validateLogin.validate(data);
};

module.exports = { createUserValidation, loginValidation };
