import Joi from "joi";

const talentsSkillVersionValidation = Joi.object({
  version: Joi.number().equal(0),
}).options({ stripUnknown: true });

// const pageValidation = Joi.number().min(0)
// const limitValidation = Joi.number().min(1).max(100)

const talentsUsersValidation = Joi.object({
  page: Joi.number().min(0),
  pageSize: Joi.number().min(1).max(100),
  hasValidatedCharter: Joi.boolean(),
  modifiedAfter: Joi.date()
}).options({ stripUnknown: true });

const talentsUsersActiveValidation = Joi.object({
  page: Joi.number().min(0),
  pageSize: Joi.number().min(1).max(100)
}).options({ stripUnknown: true });

export {talentsSkillVersionValidation, talentsUsersValidation, talentsUsersActiveValidation}
