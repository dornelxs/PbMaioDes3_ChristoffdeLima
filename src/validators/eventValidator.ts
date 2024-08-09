import Joi from 'joi';

export const createEventSchema = Joi.object({
  description: Joi.string().required(),
  dayOfWeek: Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').required(),
  userId: Joi.string().required(),
});

export const queryEventSchema = Joi.object({
  dayOfWeek: Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
  description: Joi.string(),
});
