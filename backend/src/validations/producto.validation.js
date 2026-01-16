import Joi from 'joi';

export const productoSchema = Joi.object({
  name: Joi.string().min(2).max(150).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no debe superar 150 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  description: Joi.string().allow('').max(500).messages({
    'string.max': 'La descripción no debe superar 500 caracteres'
  }),
  stock_min: Joi.number().integer().min(0).required().messages({
    'number.base': 'El stock mínimo debe ser un número',
    'number.integer': 'El stock mínimo debe ser un número entero',
    'number.min': 'El stock mínimo no puede ser negativo',
    'any.required': 'El stock mínimo es obligatorio'
  })
});
