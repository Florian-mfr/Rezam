"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTToken {
    constructor() {
        this.SECRET_KEY = 'hfj75BJ655fgcH65gfF65cgfDF654Bbvv6R';
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
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
