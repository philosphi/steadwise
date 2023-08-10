import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const userRouter = router({
  getUser: publicProcedure.input(z.string()).query((opts) => {
    opts.input; // string
    return { id: opts.input, name: 'Bilbo' };
  }),
});