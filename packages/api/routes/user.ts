import { router, protectedProcedure } from '../trpc'
import { Table } from "sst/node/table";
import { z } from 'zod'
import { User } from '../models/user';

export const userRouter = router({
  current: protectedProcedure.query(async ({ ctx }) => {
    const { db } = ctx

    const getParams = {
      TableName: Table.Counter.tableName,
      Key: {
        id: `${ctx.user.id}`
      }
    };

    try {
      const results = await db.get(getParams).promise();
      const user = results.Item as User
      return {
        statusCode: 200,
        user: user
      };
    } catch (e) {
      console.log('Update Failed', e)
      return {
        statusCode: 500,
        user: null,
      };
    }
  }),
  create: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx

      const putParams = {
        TableName: Table.Counter.tableName,
        Item: {
          id: input.id,
          email: input.email
        }
      };

      try {
        await db.put(putParams).promise();
        return {
          statusCode: 200,
          user: {
            id: input.id,
            email: input.email
          }
        };
      } catch (e) {
        console.log('Update Failed', e)
        return {
          statusCode: 500,
          user: null,
        };
      }
    })
})