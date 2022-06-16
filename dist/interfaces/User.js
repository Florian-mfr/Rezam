"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor({ username, email, password, account, role }) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.account = account;
        this.role = role;
    }
}
exports.User = User;
