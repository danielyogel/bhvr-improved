import { os } from '@orpc/server';
import * as z from 'zod';

const PlanetSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  description: z.string().optional()
});

export const listPlanet = os
  .input(z.object({ limit: z.number().int().min(1).max(100).optional(), cursor: z.number().int().min(0).default(0) }))
  .handler(async () => {
    return [{ id: 1, name: 'name' }];
  });

export const findPlanet = os
  .input(PlanetSchema.pick({ id: true }))
  .errors({ NOT_FOUND: { message: 'The resource was not found' } })
  .handler(async ({ input, errors }) => {
    if (input.id === 9) {
      throw errors.NOT_FOUND();
    }

    return { id: 9, name: 'name' };
  });

export const orpcRouter = {
  planet: {
    list: listPlanet,
    find: findPlanet
  }
};
