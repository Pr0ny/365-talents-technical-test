import Joi from 'joi'

const environmentValidation = Joi.object({
  name: Joi.string().min(1).required(),
  url: Joi.string().min(8).required(),
});

const environmentListValidation = Joi.array().items(environmentValidation);

export {environmentValidation, environmentListValidation}
