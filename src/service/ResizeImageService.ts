import express from 'express';
import path from 'path';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import { NotFoundError } from '../error/NotFoundError';
import { BadRequestError } from '../error/BadRequestError';

export const ResizeImageService = {
  resizeImage: async function resizeImage(request: express.Request): Promise<Buffer> {
    validateNumberOfRequestParams(request);
    const [name, width, height] = extractParams(request);
    const [imageFilePath, resizedImageFilePath] = getPaths(name, width, height);
    await validateImageName(imageFilePath, name);
    validateWidthAndHeight(width, height);
    await sharp(imageFilePath)
      .resize({
        width: width,
        height: height
      })
      .toFile(resizedImageFilePath);
    return fsPromises.readFile(resizedImageFilePath);
  }
};

function extractParams(request: express.Request): [string, number, number] {
  return [
    request.query.name as string,
    parseInt(request.query.width as string),
    parseInt(request.query.height as string)
  ];
}

function getPaths(name: string, width: number, height: number): [string, string] {
  const imageDirPath = path.resolve('resources', 'images', name);
  return [path.join(imageDirPath, `${name}.jpg`), path.join(imageDirPath, `${name}_${width}_${height}.jpg`)];
}

function validateNumberOfRequestParams(request: express.Request): void {
  if (!request.query || Object.keys(request.query).length !== 3) {
    throw new BadRequestError('Request must contain parameters: name, width, height');
  }
}

async function validateImageName(imageFilePath: string, name: string): Promise<void> {
  try {
    await fsPromises.access(imageFilePath);
  } catch (err) {
    throw new NotFoundError(`Could not find image with name: ${name}`);
  }
}

function validateWidthAndHeight(width: number, height: number): void {
  if (isNaN(width) || isNaN(height)) {
    throw new BadRequestError(`URL contains malformed parameters: width = ${width}, height = ${height}`);
  }
}
