"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findImages = void 0;
var sizeOf = require('image-size');
var path = require('path'), fs = require('fs');
var images_path = path.resolve(path.dirname(require.main.filename) + '/assets/images');
var publicImagesPath = path.resolve(path.dirname(require.main.filename), '../../public/dist/images');
var FileReader = /** @class */ (function () {
    function FileReader() {
        //console.log(images_path);
    }
    FileReader.prototype.find = function (startPath, filter) {
        if (startPath == '') {
            startPath = images_path;
        }
        ;
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", images_path);
            return;
        }
        var files = fs.readdirSync(startPath);
        var images = [];
        var publicImage;
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                this.find(filename, filter); //recurse
            }
            else if (filename.endsWith(filter)) {
                console.log('-- found: ', filename);
                console.log(sizeOf(filename));
                console.log('BaseName: ' + path.basename(filename));
                publicImage = this.resize(filename);
                images.push(publicImage);
            }
            ;
        }
        ;
        return images;
    };
    FileReader.prototype.resize = function (img) {
        var publicImagePath;
        fs.readFile(img, function (err, data) {
            if (err)
                throw err;
            var cropped = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = Buffer.from(cropped, 'base64');
            console.log(publicImagesPath + '/' + path.basename(img));
            fs.writeFile(publicImagesPath + '/' + path.basename(img), buf, function (err) {
                if (err) {
                    console.log(err);
                    return false;
                }
                publicImagePath = 'images/' + path.basename(img);
            });
        });
        return 'images/' + path.basename(img);
    };
    return FileReader;
}());
exports.findImages = new FileReader();
