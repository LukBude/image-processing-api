import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import rateLimit from 'express-rate-limit';
import routes from './route/routes';
import { HttpStatusCode } from './error/HttpStatusCode';
import { ApiError } from './error/ApiError';

const server = express();
const port = 3000;

const endpointAccessLogStream = fs.createWriteStream(path.resolve('logs', 'endpointAccess.log'), {
  flags: 'a'
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

server.use(morgan('common', { stream: endpointAccessLogStream }));
server.use(limiter);
server.use(helmet());

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

export default server;
