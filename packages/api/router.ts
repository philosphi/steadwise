import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { countRouter } from './functions/count';
import { router } from './trpc'
import { createContext } from './context';
import { userRouter } from './functions/user';

const appRouter = router({
  count: countRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
})