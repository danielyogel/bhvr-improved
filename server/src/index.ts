import { RPCHandler } from '@orpc/server/fetch';
import { Hono } from 'hono';

export type { InferRouterInputs, InferRouterOutputs } from '@orpc/server';

import { orpcRouter } from './router';

const app = new Hono();

const rpcHandler = new RPCHandler(orpcRouter);

app.use('/rpc/*', async (c, next) => {
  const { matched, response } = await rpcHandler.handle(c.req.raw, { prefix: '/rpc', context: {} });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

export type Router = typeof orpcRouter;
export default app;
