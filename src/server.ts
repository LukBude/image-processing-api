import express from 'express';
import routes from './route/routes';
import { HttpStatusCode } from './error/HttpStatusCode';
import { ApiError } from './error/ApiError';

const server = express();
const port = 3000;

server.use('/api', routes);

server.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof ApiError) {
    res.sendStatus(err.statusCode);
  } else {
    res.sendStatus(HttpStatusCode.INTERNAL_SERVER);
  }
});

server.listen(port, () => {
  console.log(`server started at 'http://localhost:${port}`);
});
