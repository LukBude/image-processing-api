import express from 'express';
import { HttpStatusCode } from '../../error/HttpStatusCode';
import { ImageService } from '../../service/ImageService';
import { BadRequestError } from '../../error/BadRequestError';

const image = express.Router();

image.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    validateNumberOfRequestParams(req);
    const [name, width, height] = extractParams(req);
    const responseImage = await ImageService.getImage(name, width, height);
    res.status(HttpStatusCode.OK).setHeader('content-type', 'image/jpg').send(responseImage);
  } catch (err) {
    return next(err);
  }
});

function validateNumberOfRequestParams(request: express.Request): void {
  if (!request.query || Object.keys(request.query).length !== 3) {
    throw new BadRequestError('Request must contain parameters: name, width, height');
  }
}

function extractParams(request: express.Request): [string, number, number] {
  return [
    request.query.name as string,
    parseInt(request.query.width as string),
    parseInt(request.query.height as string)
  ];
}

export default image;
