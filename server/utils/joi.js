import Joi from '@hapi/joi';

const signupSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).max(30)
    .required(),
  last_name: Joi.string().alphanum().min(3).max(30)
    .required(),
  password: Joi.string().regex(/^[a-zA-Z0-9$@$!%*?&]{3,30}$/).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  is_admin: Joi.boolean(),
  dob: Joi.string(),
  street: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
});

const signinSchema = Joi.object().keys({
  password: Joi.string().regex(/^[a-zA-Z0-9$@$!%*?&]{3,30}$/).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const updateUserSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9$@$!%*?&]{3,30}$/),
  email: Joi.string().email({ minDomainSegments: 2 }),
  is_admin: Joi.boolean(),
  dob: Joi.string(),
  street: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
});

const vehicleSchema = Joi.object().keys({
  color: Joi.string(),
  number_plate: Joi.string().required(),
  manufacturer: Joi.string(),
  model: Joi.string(),
  year: Joi.string(),
  capacity: Joi.string(),
});

export { signupSchema, signinSchema, updateUserSchema, vehicleSchema };
