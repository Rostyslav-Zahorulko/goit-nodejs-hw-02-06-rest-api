const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(45).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(45).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
    .optional(),
});

const validate = async (schema, data, next) => {
  try {
    await schema.validateAsync(data);
    next();
  } catch (error) {
    next({
      status: "error",
      code: 400,
      message: `Field ${error.message.replace(/"/g, "'")}`,
    });
  }
};

const validateContactCreation = (req, res, next) =>
  validate(createContactSchema, req.body, next);

const validateContactUpdation = (req, res, next) =>
  validate(updateContactSchema, req.body, next);

module.exports = {
  validateContactCreation,
  validateContactUpdation,
};
