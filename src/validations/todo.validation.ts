import * as Joi from '@hapi/joi'

export default {
  create: {
    body: Joi.object({
      title: Joi.string()
        .required()
        .min(1),
      status: Joi.string().valid('pending', 'done', 'canceled'),
    }),
  },
  read: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    }),
    body: Joi.object({
      title: Joi.string()
        .required()
        .min(1),
      status: Joi.string()
        .valid('pending', 'done', 'canceled')
        .required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    }),
  },
}
