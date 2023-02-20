import Joi from 'joi'

const signupValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  forename: Joi.string().min(2).required(),
  lastname: Joi.string().min(2).required(),
  age: Joi.number().min(0).max(150).required()
});

const signinValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const talentSigninValidation = Joi.object({
  clientId: Joi.string().required(),
});

const talentCharterValidationValidation = Joi.object({
  clientId: Joi.string().required(),
  validationDate: Joi.date()
});

export {signupValidation, signinValidation, talentSigninValidation, talentCharterValidationValidation}
