"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTour = exports.updateTour = exports.createTour = exports.getTour = exports.getAllTours = exports.checkBody = exports.checkID = void 0;
var fs_1 = __importDefault(require("fs"));
var tours_simple_data_1 = require("../dev-data/data/tours-simple.data");
// const readFileSrc: any = `${__dirname}/dev-data/data/tours-simple.json`;
// console.log({ __dirname });
// const tourJson = fs.readFileSync(readFileSrc);
var tours = tours_simple_data_1.data;
var checkID = function (req, res, next, val) {
    console.log("Tour id is: " + val);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};
exports.checkID = checkID;
var checkBody = function (req, res, next) {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};
exports.checkBody = checkBody;
var getAllTours = function (req, res) {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    });
};
exports.getAllTours = getAllTours;
var getTour = function (req, res) {
    console.log(req.params);
    var id = req.params.id * 1;
    var tour = tours.find(function (el) { return el.id === id; });
    res.status(200).json({
        status: 'success',
        data: {
            tour: tour
        }
    });
};
exports.getTour = getTour;
var createTour = function (req, res) {
    var newId = tours[tours.length - 1].id + 1;
    var newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs_1.default.writeFile(__dirname + "/dev-data/data/tours-simple.json", JSON.stringify(tours), function (err) {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};
exports.createTour = createTour;
var updateTour = function (req, res) {
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated tour here...>"
        }
    });
};
exports.updateTour = updateTour;
var deleteTour = function (req, res) {
    res.status(204).json({
        status: 'success',
        data: null
    });
};
exports.deleteTour = deleteTour;
