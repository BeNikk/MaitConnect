"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtsecREt = process.env.JWT_SECRET || "ABC";
function generateToken(username, res) {
    try {
        const token = jsonwebtoken_1.default.sign(username, jwtsecREt, {});
        return token;
    }
    catch (e) {
        console.log(`error in signing ${e}`);
        return res.json({ message: "error occured in setting cookie" });
    }
}
exports.default = generateToken;
