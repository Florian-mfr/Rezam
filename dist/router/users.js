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
const models_1 = __importDefault(require("../../models"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const _1 = __importDefault(require("."));
const express_validation_1 = require("express-validation");
const Validation_1 = __importDefault(require("../middleware/Validation"));
const Models_1 = require("../interfaces/Models");
const User_1 = require("../interfaces/User");
class UsersController extends _1.default {
    constructor() {
        super();
        this.modelName = Models_1.Models.User;
        this.Model = User_1.User;
        this.validation = new Validation_1.default(Models_1.Models.User);
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get('/users', this.getAllModel);
        this.router.get('/users/:id', this.getOneModel);
        this.router.post('/users/register', (0, express_validation_1.validate)(this.validation.getValidationSchema()), this.register);
        this.router.post('/users/login', (0, express_validation_1.validate)(this.validation.getValidationSchema()), this.login);
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const role = req.body.role;
            const account = req.body.account;
            if (!email || !username || !password || !account || !role)
                return res.status(400).json({ error: 'missing parameters' });
            // if (!['ADMIN', 'SUPERADMIN'].includes(role)) return res.status(403).json({error: 'create user forbidden'})
            let user;
            try {
                user = yield models_1.default.User.findOne({
                    attributes: ['username'],
                    where: { username: username }
                });
            }
            catch (err) {
                return res.status(500).json({ message: 'error findone user', error: err });
            }
            if (user)
                return res.status(409).json({ error: 'user already exist', message: user });
            try {
                const hash = yield bcrypt_1.default.hash(password, 5);
                yield models_1.default.User.create({ id: (0, uuid_1.v4)(), email, username, password: hash, role, account });
            }
            catch (err) {
                return res.status(500).json({ message: 'error create user', error: err });
            }
            return res.status(201).json({ success: 'user successfully registered' });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const password = req.body.password;
            if (!username || !password)
                return res.status(400).json({ error: 'missing parameters' });
            // if (!['ADMIN', 'SUPERADMIN'].includes(role)) return res.status(403).json({error: 'create user forbidden'})
            let user;
            try {
                user = yield models_1.default.User.findOne({
                    where: { username: username }
                });
            }
            catch (err) {
                return res.status(500).json({ message: 'error findone user', error: err });
            }
            if (!user)
                return res.status(404).json({ error: 'user not found' });
            const resBcrypt = yield bcrypt_1.default.compare(password, user.password);
            if (!resBcrypt)
                return res.status(400).json({ error: 'bad password' });
            return res.status(200).json({
                userId: user.id,
                token: new jwt_1.default().generateToken(user)
            });
        });
    }
}
exports.default = UsersController;
