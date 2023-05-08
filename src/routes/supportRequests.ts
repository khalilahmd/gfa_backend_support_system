// src/routes/supportRequests.ts

import Router from 'koa-router';
import { Context } from 'koa';
import {
  createRequest,
  getAllPendingRequests,
  getUserSpecificRequests,
  getRequestById,
  askQuestion,
  answerQuestion,
  changeStatus,
  deleteRequest,
} from '../controllers/supportRequestsController';

const router = new Router({ prefix: '/support-requests' });

router.post('/',  async (ctx: Context) => {
    await createRequest(ctx);
});
router.get('/',  async (ctx: Context) => {
    await getRequestById(ctx);
});
router.get('/',  async (ctx: Context) => {
    await getAllPendingRequests(ctx);
});
router.get('/user',  async (ctx: Context) => {
    await getUserSpecificRequests(ctx);
});
router.put('/ask',  async (ctx: Context) => {
    await askQuestion(ctx);
});
router.put('/answer',  async (ctx: Context) => {
    await answerQuestion(ctx);
});
router.put('/change-status',  async (ctx: Context) => {
    await changeStatus(ctx);
});
router.delete('/',  async (ctx: Context) => {
    await deleteRequest(ctx);
})

export default router;
