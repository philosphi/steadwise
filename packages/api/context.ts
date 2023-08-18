import { inferAsyncReturnType } from '@trpc/server';
import { CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { DynamoDB } from "aws-sdk";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Config } from "sst/node/config";

export const createContext = async ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  const db = new DynamoDB.DocumentClient();

  const isExpired = (exp: number) => {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    return (exp < currentTimestamp) 
  }

  const getUser = async () => {
    const sessionToken = event.headers.authorization?.split(' ')[1]

    if (sessionToken) {
      if (!Config.JWT_VERIFICATION_KEY) {
        console.error('JWT_VERIFICATION_KEY is not set')
        return null
      }

      try {
        const authorized = jwt.verify(sessionToken, Config.JWT_VERIFICATION_KEY, {
          algorithms: ['HS256'],
        })

        if (!authorized) {
          return null
        }

        const { exp, sub } = jwt.decode(sessionToken) as JwtPayload

        if (!exp || isExpired(exp)) return null

        if (sub) {
          return {
            id: sub,
          }
        }
      } catch (e) {
        console.error(e)
      }
    }

    return null
  }

  const user = await getUser()
  return { user, db }
}


export type Context = inferAsyncReturnType<typeof createContext>;