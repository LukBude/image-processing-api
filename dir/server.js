"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes/routes"));
var server = (0, express_1.default)();
var port = 3000;
server.use('/api', routes_1.default);
server.listen(port, function () {
    console.log("server started at 'http://localhost:".concat(port));
});
