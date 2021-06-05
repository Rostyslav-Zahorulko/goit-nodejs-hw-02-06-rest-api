const Joi = require("joi");

const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
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

const validateUserSubscriptionUpdation = (req, res, next) =>
  validate(updateUserSubscriptionSchema, req.body, next);

module.exports = {
  validateUserSubscriptionUpdation,
};
