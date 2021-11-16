"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var tour_router_1 = __importDefault(require("./routes/tour.router"));
var user_router_1 = __importDefault(require("./routes/user.router"));
var app = (0, express_1.default)();
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use(express_1.default.static(__dirname + "/public"));
app.use(function (req, res, next) {
    console.log('Hello from the middleware 👋');
    next();
});
app.use(function (req, res, next) {
    req.requestTime = new Date().toISOString();
    next();
});
// 3) ROUTES
app.use("/api/v1/tours", tour_router_1.default);
app.use("/api/v1/users", user_router_1.default);
exports.default = app;
