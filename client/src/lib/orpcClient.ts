import type { RouterClient } from '@orpc/server';
import { createORPCClient, createSafeClient } from '@orpc/client';

import { RPCLink } from '@orpc/client/fetch';
import type { Router, InferRouterInputs, InferRouterOutputs } from '../../../server/src';

const link = new RPCLink({
  url: `${window.location.origin}/rpc`,
  headers: { Authorization: 'Bearer token' },
});

const orpc: RouterClient<Router> = createORPCClient(link);

export const client = createSafeClient(orpc);
export type { InferRouterInputs, InferRouterOutputs };
export type RouterOutput = InferRouterOutputs<Router>;
export type RouterInput = InferRouterInputs<Router>;
