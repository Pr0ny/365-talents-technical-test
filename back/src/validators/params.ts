import Joi from 'joi'

const idValidation = Joi.object({
    id: Joi.number().min(0).max(10000).required() //FIXME: Should be an env variable or at least a "global"
});

export {idValidation}
