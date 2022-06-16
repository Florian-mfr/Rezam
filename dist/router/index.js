"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = __importDefault(require("../../models"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const uuid_1 = require("uuid");
class BaseController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.JWT = new jwt_1.default();
        this.getAllModel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = this.JWT.parseJwt(req.headers.authorization);
            try {
                const results = yield models_1.default[this.modelName].findAll({
                    where: { account: user.account }
                });
                if (!(results === null || results === void 0 ? void 0 : results.length))
                    return res.status(404).json({ error: `${this.modelName}s not found` });
                return res.status(200).json({ results });
            }
            catch (err) {
                return res.status(500).json({ message: `error find ${this.modelName}s`, error: err });
            }
        });
        this.getOneModel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.id && !req.params.id)
                return res.status(400).json({ error: `invalid payload to get one ${this.modelName}` });
            const id = req.body.id || req.params.id;
            try {
                const result = yield models_1.default[this.modelName].findOne({ where: { id: id } });
                if (!result)
                    return res.status(404).json({ error: `${this.modelName} not found` });
                return res.status(200).json({ result });
            }
            catch (err) {
                return res.status(500).json({ message: `error find ${this.modelName}`, error: err });
            }
        });
        this.postModel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = this.JWT.parseJwt(req.headers.authorization);
            if (!['ADMIN', 'SUPERADMIN'].includes(user.role))
                return res.status(403).json({ error: `role admin is required to create ${this.modelName}` });
            let data = new this.Model(req.body, user.account);
            data.id = (0, uuid_1.v4)();
            try {
                yield models_1.default[this.modelName].create(data);
            }
            catch (err) {
                return res.status(500).json({ message: `error create ${this.modelName}`, error: err });
            }
            return res.status(201).json({ success: `${this.modelName} successfully created` });
        });
        this.putModel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = this.JWT.parseJwt(req.headers.authorization);
            if (!['ADMIN', 'SUPERADMIN'].includes(user.role))
                return res.status(403).json({ error: `role admin is required to put ${this.modelName}` });
            let data = new this.Model(req.body);
            for (const [key, value] of Object.entries(req.body)) {
                if (!(key in data))
                    return res.status(400).json({ error: `invalid payload to put ${this.modelName}` });
            }
            let result;
            try {
                result = yield models_1.default[this.modelName].findOne({ where: { id: data.id } });
                if (!result)
                    return res.status(404).json({ error: `${this.modelName} not found` });
            }
            catch (err) {
                return res.status(500).json({ message: `error find ${this.modelName}`, error: err });
            }
            if (result.dataValues.account !== user.account)
                return res.status(403).json({ error: `forbidden to put ${this.modelName}` });
            try {
                yield result.update(req.body);
            }
            catch (err) {
                return res.status(500).json({ message: `error put ${this.modelName}`, error: err });
            }
            return res.status(204).json({ success: `${this.modelName} successfully putted` });
        });
        this.patchModel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = this.JWT.parseJwt(req.headers.authorization);
            if (!['ADMIN', 'SUPERADMIN'].includes(user.role))
                return res.status(403).json({ error: `role admin is required to patch ${this.modelName}` });
            // let data = Object.assign({}, DefaultModel[this.modelName])
            // console.log(this.IModel)
            // if (!(req.body instanceof this.Model)) return res.status(400).json({error: `invalid payload to patch ${this.modelName}`})
            const data = new this.Model(req.body);
            for (const [key, value] of Object.entries(req.body)) {
                if (!(key in data))
                    return res.status(400).json({ error: `invalid payload to patch ${this.modelName}` });
            }
            let result;
            try {
                result = yield models_1.default[this.modelName].findOne({ where: { id: req.params.id } });
                if (!result)
                    return res.status(404).json({ error: `${this.modelName} not found` });
            }
            catch (err) {
                return res.status(500).json({ message: `error find ${this.modelName}`, error: err });
            }
            if (result.dataValues.account !== user.account)
                return res.status(403).json({ error: `forbidden to patch ${this.modelName}` });
            try {
                yield result.update(req.body);
            }
            catch (err) {
                return res.status(500).json({ message: `error patch ${this.modelName}`, error: err });
            }
            return res.status(204).json({ success: `${this.modelName} successfully patched` });
        });
        this.deleteModel = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.id && !req.params.id)
                return res.status(400).json({ error: `invalid payload to delete ${this.Model}` });
            const id = req.body.id || req.params.id;
            try {
                yield models_1.default[this.Model].destroy({ where: { id: id } });
            }
            catch (err) {
                return res.status(500).json({ message: `error find ${this.Model}`, error: err });
            }
            return res.status(204).json({ success: `${this.Model} successfully deleted` });
        });
    }
}
exports.default = BaseController;
