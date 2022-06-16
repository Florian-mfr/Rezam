"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const users_1 = __importDefault(require("./router/users"));
const products_1 = __importDefault(require("./router/products"));
const app = new app_1.default([
    new users_1.default(),
    new products_1.default(),
], 4000);
app.listen();
