const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(45)
    .pattern(/^[A-Z]\w+ [A-Z]\w+$/)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(45)
    .pattern(/^[A-Z]\w+ [A-Z]\w+$/)
    .optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/)
    .optional(),
  favorite: Joi.boolean().optional(),
});

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
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

const validateContactStatusUpdation = (req, res, next) =>
  validate(updateContactStatusSchema, req.body, next);

module.exports = {
  validateContactCreation,
  validateContactUpdation,
  validateContactStatusUpdation,
};
