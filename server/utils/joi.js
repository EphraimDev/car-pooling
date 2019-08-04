import Joi from '@hapi/joi';

const signupSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).max(30)
    .required(),
  last_name: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9$@$!%*?&]{3,30}$/).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  is_admin: Joi.boolean()
});


export { signupSchema };
