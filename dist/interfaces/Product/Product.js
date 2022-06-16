"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor({ name, price = 0, allergen = [], ingredients = [], alcohol = false }, account) {
        this.name = name;
        this.account = account;
        this.price = price;
        this.allergen = allergen;
        this.ingredients = ingredients;
        this.alcohol = alcohol;
    }
}
exports.default = Product;
