import Joi from "joi";

const skillVersionValidation = Joi.object({
  version: Joi.number().equal(0),
});

export {skillVersionValidation}
