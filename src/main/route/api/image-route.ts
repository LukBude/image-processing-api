import express from 'express';
import { HttpStatusCode } from '../../error/HttpStatusCode';
import { BadRequestError } from '../../error/BadRequestError';
import imageService from '../../service/ImageService';

const imageRoute = express.Router();

imageRoute.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    validateNumberOfRequestParams(req);
    const [name, width, height] = extractParams(req);
    const responseImage = await imageService.getImage(name, width, height);
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

export default imageRoute;
