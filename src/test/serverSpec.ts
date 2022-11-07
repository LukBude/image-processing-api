import supertest from 'supertest';
import server from '../main/server';
import { HttpStatusCode } from '../main/error/HttpStatusCode';

interface RequestParams {
  name?: string;
  width?: string;
  height?: string;
}

function createURL(requestParams: RequestParams): string {
  const params = Object.keys(requestParams)
    .filter((key: string) => key !== undefined)
    .map((key: string) => `${key}=${requestParams[key as keyof typeof requestParams]}`)
    .join('&');
  return params.length === 0 ? '/api/image' : ['/api/image', '?', params].join('');
}

const request = supertest(server);

describe('Test image endpoint response', () => {
  it('should return status OK for a valid request', async () => {
    const validRequest = createURL({ name: 'fjord', width: '300', height: '300' });
    const response = await request.get(validRequest);
    expect(response.status).toBe(HttpStatusCode.OK);
  });

  describe('should return status BAD REQUEST when request is missing parameter', () => {
    it('name', async () => {
      const inValidRequest = createURL({ width: '300', height: '300' });
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('width', async () => {
      const inValidRequest = createURL({ name: 'fjord', height: '300' });
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('height', async () => {
      const inValidRequest = createURL({ name: 'fjord', width: '300' });
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('name and width', async () => {
      const inValidRequest = createURL({ height: '300' });
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('name and height', async () => {
      const inValidRequest = createURL({ width: '300' });
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('width and height', async () => {
      const inValidRequest = createURL({ name: 'fjord' });
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });

    it('name, width and height', async () => {
      const inValidRequest = createURL({});
      const response = await request.get(inValidRequest);
      expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
    });
  });

  it('should return status BAD REQUEST when request parameter "width" is not a number', async () => {
    const inValidRequest = createURL({ name: 'fjord', width: 'abc', height: '300' });
    const response = await request.get(inValidRequest);
    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return status BAD REQUEST when request parameter "height" is not a number', async () => {
    const inValidRequest = createURL({ name: 'fjord', width: '300', height: 'abc' });
    const response = await request.get(inValidRequest);
    expect(response.status).toBe(HttpStatusCode.BAD_REQUEST);
  });

  it('should return status NOT FOUND when request parameter "name" does not reference an existing image', async () => {
    const inValidRequest = createURL({ name: 'doesNotExist', width: '300', height: '300' });
    const response = await request.get(inValidRequest);
    expect(response.status).toBe(HttpStatusCode.NOT_FOUND);
  });
});
