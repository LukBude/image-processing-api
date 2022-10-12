"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var image = express_1.default.Router();
image.get('/', function (req, res) {
    console.log(req.query.name);
});
exports.default = image;
