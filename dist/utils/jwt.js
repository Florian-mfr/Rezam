"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const atob_1 = __importDefault(require("atob"));
class JWTToken {
    constructor() {
        this.SECRET_KEY = process.env.JWT_TOKEN;
    }
    parseJwt(token) {
        console.log(token);
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent((0, atob_1.default)(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    generateToken(user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, account: user.account, role: user.role }, this.SECRET_KEY, { expiresIn: '2 days' });
        return token;
    }
}
exports.default = JWTToken;
