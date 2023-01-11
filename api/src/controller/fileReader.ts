const sizeOf = require('image-size');
const path = require('path'),
fs = require('fs');

const images_path = path.resolve(path.dirname(require.main.filename) + '/assets/images');
const publicImagesPath = path.resolve(path.dirname(require.main.filename), '../../public/dist/images');

class FileReader {
    constructor(){
        //console.log(images_path);
    }
    find(startPath:string, filter:string){
        if(startPath == '') {
            startPath = images_path;
        };
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", images_path);
            return;
        }
    
        const files = fs.readdirSync(startPath);
        let images:string[] = [];
        let publicImage:string;
        for (let i = 0; i < files.length; i++) {
            let filename = path.join(startPath, files[i]);
            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                this.find(filename, filter); //recurse
            } else if (filename.endsWith(filter)) {
                console.log('-- found: ', filename);
                console.log(sizeOf(filename));
                console.log('BaseName: ' + path.basename(filename));
                publicImage = this.resize(filename);
                images.push(publicImage);
            };
        };
        return images;
    }

    private resize(img:string){
        let publicImagePath:string;
        fs.readFile(img, function(err:string, data:ImageData){
            if(err) throw err;
            let cropped = img.replace(/^data:image\/\w+;base64,/, "");
            const buf = Buffer.from(cropped, 'base64');
            console.log(publicImagesPath + '/' + path.basename(img));
            fs.writeFile(publicImagesPath + '/' + path.basename(img), buf, (err:Error) => {
                if(err) {
                    console.log(err);
                    return false;
                }
                publicImagePath = 'images/' + path.basename(img);
            });
        });
        return 'images/' + path.basename(img);
    }
}
export const findImages = new FileReader();