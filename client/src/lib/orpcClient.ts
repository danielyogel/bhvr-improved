import { createORPCClient, createSafeClient } from '@orpc/client';
import { RPCLink } from '@orpc/client/fetch';
import type { RouterClient } from '@orpc/server';
import type { InferRouterInputs, InferRouterOutputs, Router } from '@repo/server';

const link = new RPCLink({
  url: `${window.location.origin}/rpc`,
  headers: { Authorization: 'Bearer token' }
});

const orpc: RouterClient<Router> = createORPCClient(link);

export const client = createSafeClient(orpc);
export type { InferRouterInputs, InferRouterOutputs };
export type RouterOutput = InferRouterOutputs<Router>;
export type RouterInput = InferRouterInputs<Router>;
