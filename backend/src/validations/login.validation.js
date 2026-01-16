import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'El correo es obligatorio',
    'string.email': 'El correo debe ser válido',
    'any.required': 'El correo es obligatorio'
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'string.max': 'La contraseña no debe superar 100 caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
});
