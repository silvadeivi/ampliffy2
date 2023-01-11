"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var fileReader_1 = require("../controller/fileReader");
exports.app = (0, express_1.default)();
var images;
exports.app.get('/', function (req, res) {
    console.log('Home');
    res.send('Express + TypeScript Server');
});
exports.app.get('/*.jpg', function (req, res) {
    console.log('JPG');
    images = fileReader_1.findImages.find('', '.jpg');
    res.send(images);
});
exports.app.get('/*.png', function (req, res) {
    console.log('PNG');
    images = fileReader_1.findImages.find('', '.png');
    res.send(images);
});
