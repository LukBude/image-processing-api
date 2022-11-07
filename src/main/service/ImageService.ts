import path from 'path';
import sharp from 'sharp';
import fs, { promises as fsPromises } from 'fs';
import { NotFoundError } from '../error/NotFoundError';
import { BadRequestError } from '../error/BadRequestError';

export const ImageService = {
  getImage: async function getImage(name: string, width: number, height: number): Promise<Buffer> {
    const [imageFilePath, resizedImageFilePath] = getPaths(name, width, height);
    validateImageName(imageFilePath, name);
    validateWidthAndHeight(width, height);
    try {
      await fsPromises.access(resizedImageFilePath);
    } catch (err) {
      await sharp(imageFilePath)
        .resize({
          width: width,
          height: height
        })
        .toFile(resizedImageFilePath);
    }
    return fsPromises.readFile(resizedImageFilePath);
  }
};

function getPaths(name: string, width: number, height: number): [string, string] {
  const imageDirPath = path.resolve('resources', 'images', name);
  return [path.join(imageDirPath, `${name}.jpg`), path.join(imageDirPath, `${name}_${width}_${height}.jpg`)];
}

function validateImageName(imageFilePath: string, name: string): void {
  if (!fs.existsSync(imageFilePath)) {
    throw new NotFoundError(`Could not find image with name: ${name}`);
  }
}

function validateWidthAndHeight(width: number, height: number): void {
  if (isNaN(width) || isNaN(height)) {
    throw new BadRequestError(`URL contains malformed parameters: width = ${width}, height = ${height}`);
  }
}
