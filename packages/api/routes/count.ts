import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { router, publicProcedure } from '../trpc'

const dynamoDb = new DynamoDB.DocumentClient();

const getParams = {
  // Get the table name from the environment variable
  TableName: Table.Counter.tableName,
  // Get the row where the counter is called "clicks"
  Key: {
    counter: "clicks",
  },
};

export const countRouter = router({
  getCount: publicProcedure.query(async () => {
    const results = await dynamoDb.get(getParams).promise();

    // If there is a row, then get the value of the
    // column called "tally"
    let count = results.Item ? results.Item.tally : 0;

    return {
      statusCode: 200,
      body: count,
    };
  }),
  addCount: publicProcedure.mutation(async () => {
    try {
      const results = await dynamoDb.get(getParams).promise();

      // If there is a row, then get the value of the
      // column called "tally"
      let count = results.Item ? results.Item.tally : 0;

      const putParams = {
        TableName: Table.Counter.tableName,
        Key: {
          counter: "clicks",
        },
        // Update the "tally" column
        UpdateExpression: "SET tally = :count",
        ExpressionAttributeValues: {
          // Increase the count
          ":count": ++count,
        },
      };
      await dynamoDb.update(putParams).promise();
      return {
        statusCode: 200,
        body: count,
      };
    } catch (e) {
      console.error('Update Failed', e)
      return {
        statusCode: 500,
      };
    }
  }),
})