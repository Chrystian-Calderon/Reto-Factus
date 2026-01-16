import Joi from 'joi';

export const bodegaSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no debe superar 100 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  location: Joi.string().allow('').max(150).messages({
    'string.max': 'La ubicación no debe superar 150 caracteres'
  })
});
