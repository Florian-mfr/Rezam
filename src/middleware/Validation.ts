import { Joi } from 'express-validation'
import { Models } from '../interfaces/Models'

export default class Validation {
  modelName: Models
  validationShema = {
    User: {
      body: Joi.object({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .required(),
        username: Joi.string()
          .required(),
        account: Joi.string(),
        role: Joi.string()
          .valid('ADMIN', 'WAITER', 'COOK')
          .required(),
      }),
    },
    Product: {
      body: Joi.object({
        name: Joi.string()
          .required(),
        price: Joi.number(),
        allergen: Joi.array().items(Joi.string()),
        ingredients: Joi.array().items(Joi.string()),
        alcohol: Joi.boolean()
      }),
    },
  }
  constructor (modelName: Models) {
    this.modelName = modelName
  }

  getValidationSchema () {
    return this.validationShema[this.modelName]
  }
}