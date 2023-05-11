import Router from 'koa-router';
import { Context } from 'koa';
import {
  createRequest,
  getAllPendingRequests,
  getUserSpecificRequests,
  getRequestById,
  getQueriedRequests,
  askQuestion,
  answerQuestion,
  changeStatus,
  deleteRequest,
} from '../controllers/supportRequestsController';

const router = new Router({ prefix: '/tickets' });

// to create a new request
router.post('/',  async (ctx: Context) => {
    await createRequest(ctx);
});

// to get a specific request by identifier
router.get('/',  async (ctx: Context) => {
    await getRequestById(ctx);
});

// to get all pending requests
router.get('/pending',  async (ctx: Context) => {
    await getAllPendingRequests(ctx);
});

// to get all requests against a specific user
router.get('/user',  async (ctx: Context) => {
    await getUserSpecificRequests(ctx);
});

// to get request against a query by user
router.get('/query',  async (ctx: Context) => {
    await getQueriedRequests(ctx);
});

// to ask any question on a specific request
router.put('/question',  async (ctx: Context) => {
    await askQuestion(ctx);
});

// to respond to a specific request
router.put('/response',  async (ctx: Context) => {
    await answerQuestion(ctx);
});

// to change the status of a request
router.put('/change-status',  async (ctx: Context) => {
    await changeStatus(ctx);
});

// to delete a request
router.delete('/',  async (ctx: Context) => {
    await deleteRequest(ctx);
})


export default router;
