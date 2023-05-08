import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose, { AnyKeys } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import supportRequests from './routes/supportRequests';

const app = new Koa();
app.use(bodyParser());
const router = new Router();
const uri = process.env.DATABASE_URL || 'mongodb://localhost/mydatabase';
const PORT = process.env.PORT || 3000;

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully to server");
});

router.get('/', async (ctx) => {
  ctx.body = `Server is running on port ${PORT}`
})

app.use(router.routes());
app.use(supportRequests.routes());

app.listen(PORT);

