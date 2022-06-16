"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const Product_1 = require("../interfaces/Product");
const express_validation_1 = require("express-validation");
const Validation_1 = __importDefault(require("../middleware/Validation"));
const Models_1 = require("../interfaces/Models");
class ProductsController extends _1.default {
    constructor() {
        super();
        this.Model = Product_1.Product;
        this.modelName = Models_1.Models.Product;
        this.validation = new Validation_1.default(Models_1.Models.Product);
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/products', this.getAllModel);
        this.router.get('/products/:id', this.getOneModel);
        this.router.post('/products', (0, express_validation_1.validate)(this.validation.getValidationSchema()), this.postModel);
        this.router.patch('/products/:id', (0, express_validation_1.validate)(this.validation.getValidationSchema()), this.patchModel);
        this.router.delete('/products/:id', this.deleteModel);
    }
}
exports.default = ProductsController;
