import express from 'express';
import { HttpStatusCode } from '../../error/HttpStatusCode';
import { ResizeImageService } from '../../service/ResizeImageService';

const image = express.Router();

image.get('/', async (req, res, next) => {
  let responseImage;
  try {
    responseImage = await ResizeImageService.resizeImage(req);
  } catch (err) {
    return next(err);
  }
  res.setHeader('content-type', 'image/jpg');
  res.status(HttpStatusCode.OK);
  res.send(responseImage);
});

export default image;
