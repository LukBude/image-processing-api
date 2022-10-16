import { promises as fsPromises } from 'fs';
import path from 'path';
import { ImageService } from '../../main/service/ImageService';
import sharp from 'sharp';

describe('Test image service', () => {
  describe('Test getImage', () => {
    const imageDirPath = path.resolve('resources', 'images', 'fjord');
    const resizedImageFilePath = path.join(imageDirPath, 'fjord_300_300.jpg');

    it('should return correct image dimensions and format', async () => {
      const image = await ImageService.getImage('icelandwaterfall', 500, 300);
      const metadata = await sharp(image).metadata();
      expect(metadata.width).toEqual(500);
      expect(metadata.height).toEqual(300);
      expect(metadata.format).toEqual('jpeg');
    });

    it('should return existing image', async () => {
      const existingImageBirthtime = (await fsPromises.stat(resizedImageFilePath)).birthtime;
      await ImageService.getImage('fjord', 300, 300);
      expect(existingImageBirthtime).toEqual((await fsPromises.stat(resizedImageFilePath)).birthtime);
    });

    it('should create image if not exists', async () => {
      const existingImageBirthtime = (await fsPromises.stat(resizedImageFilePath)).birthtime;
      await fsPromises.unlink(resizedImageFilePath);
      await ImageService.getImage('fjord', 300, 300);
      expect(existingImageBirthtime).not.toEqual((await fsPromises.stat(resizedImageFilePath)).birthtime);
    });
  });
});