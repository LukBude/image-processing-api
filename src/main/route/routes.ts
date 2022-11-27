import express from 'express';
import imageRoute from './api/image-route';

const routes = express.Router();

routes.use('/image', imageRoute);

export default routes;
