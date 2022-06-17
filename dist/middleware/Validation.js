"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validation_1 = require("express-validation");
class Validation {
    constructor(modelName) {
        this.validationShema = {
            User: {
                body: express_validation_1.Joi.object({
                    email: express_validation_1.Joi.string()
                        .email()
                        .required(),
                    password: express_validation_1.Joi.string()
                        .required(),
                    username: express_validation_1.Joi.string()
                        .required(),
                    account: express_validation_1.Joi.string(),
                    role: express_validation_1.Joi.string()
                        .valid('ADMIN', 'WAITER', 'COOK', 'SUPERADMIN')
                        .required(),
                }),
            },
            Product: {
                body: express_validation_1.Joi.object({
                    name: express_validation_1.Joi.string()
                        .required(),
                    price: express_validation_1.Joi.number(),
                    allergen: express_validation_1.Joi.array().items(express_validation_1.Joi.string()),
                    ingredients: express_validation_1.Joi.array().items(express_validation_1.Joi.string()),
                    alcohol: express_validation_1.Joi.boolean()
                }),
            },
        };
        this.modelName = modelName;
    }
    getValidationSchema() {
        return this.validationShema[this.modelName];
    }
}
exports.default = Validation;
