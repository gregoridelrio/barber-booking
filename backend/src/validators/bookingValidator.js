const Joi = require('joi');

const createAppointmentSchema = Joi.object({
  barberId: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del barbero debe ser un número',
    'any.required': 'El barbero es obligatorio'
  }),
  serviceId: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del servicio debe ser un número',
    'any.required': 'El servicio es obligatorio'
  }),
  customerName: Joi.string().min(2).max(100).trim().required().messages({
    'string.empty': 'El nombre del cliente no puede estar vacío',
    'any.required': 'El nombre del cliente es obligatorio'
  }),
  customerEmail: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Debe proporcionar un email válido',
    'any.required': 'El email es obligatorio'
  }),
  customerPhone: Joi.string().min(7).max(20).trim().required().messages({
    'string.empty': 'El teléfono no puede estar vacío',
    'any.required': 'El teléfono es obligatorio'
  }),
  startTime: Joi.date().iso().required().messages({
    'date.format': 'La fecha/hora debe estar en formato ISO 8601 UTC (ej. YYYY-MM-DDTHH:mm:ss.sssZ)',
    'any.required': 'La hora de inicio es obligatoria'
  })
});

const getAppointmentsQuerySchema = Joi.object({
  date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.pattern.base': 'El parámetro date debe tener el formato YYYY-MM-DD',
    'any.required': 'El parámetro date es obligatorio'
  }),
  barberId: Joi.number().integer().positive().optional()
});

module.exports = {
  createAppointmentSchema,
  getAppointmentsQuerySchema
};