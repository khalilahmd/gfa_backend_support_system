import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { connectDatabase } from './dbConnection';
import mainRouter from './routes/index';

const app = new Koa();
app.use(bodyParser());

connectDatabase();

app.use(mainRouter.routes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

