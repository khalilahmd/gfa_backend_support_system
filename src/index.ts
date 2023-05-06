import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = new Koa();
const router = new Router();
const uri = process.env.MONGODB_URI || 'mongodb://localhost/mydatabase';
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

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT);
