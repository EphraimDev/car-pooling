import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9$@$!%*?&]{3,30}$/),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
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

const tripSchema = Joi.object().keys({
  date: Joi.string().required(),
  time: Joi.string().required(),
  fare: Joi.string().required(),
  vehicle: Joi.string().required(),
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  status: Joi.string()
});

export { userSchema, vehicleSchema, tripSchema };
