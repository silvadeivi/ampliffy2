import express, { Express, Request, Response } from 'express';
import { findImages } from '../controller/fileReader';

export const app = express();

let images;

app.get('/', (req, res) => {
    console.log('Home');
	res.send('Express + TypeScript Server');
});
app.get('/*.jpg', (req, res) => {
    console.log('JPG');
	images = findImages.find('', '.jpg');
	res.send(images);
});
app.get('/*.png', (req, res) => {
    console.log('PNG');
    images = findImages.find('', '.png');
	res.send(images);
});