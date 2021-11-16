"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = __importDefault(require("./index"));
dotenv_1.default.config({ path: './config.env' });
var port = process.env.PORT || 3000;
index_1.default.listen(port, function () {
    console.log("App running on port " + port + "...");
});
