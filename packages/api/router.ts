import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { countRouter } from './routes/count';
import { router } from './trpc'
import { createContext } from './context';
import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';

const appRouter = router({
  auth: authRouter,
  count: countRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
})