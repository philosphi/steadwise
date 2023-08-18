import { StackContext, Table, Api, NextjsSite, Bucket, Config } from "sst/constructs";

export function AppStack({ stack }: StackContext) {

  const JWT_VERIFICATION_KEY = new Config.Secret(stack, "JWT_VERIFICATION_KEY");

  const countTable = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  const userTable = new Table(stack, "Users", {
    fields: {
      id: "string",
      email: "string"
    },
    primaryIndex: { partitionKey: "id" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [userTable, countTable, JWT_VERIFICATION_KEY],
      },
    },
    routes: {
      "GET /trpc/{proxy+}": "../../packages/api/router.handler",
      "POST /trpc/{proxy+}": "../../packages/api/router.handler",
    },
  });

  const site = new NextjsSite(stack, "site", {
    environment: {
      NEXT_PUBLIC_API_URL: api.url,
    }
  });

  // Show the URLs in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
  });
}