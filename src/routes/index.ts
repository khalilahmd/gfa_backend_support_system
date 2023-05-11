import Router from 'koa-router';
import supportRouter from './support';

const mainRouter = new Router();

mainRouter.use(supportRouter.routes());

export default mainRouter;