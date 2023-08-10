import { StackContext, Table, Api, NextjsSite, Bucket } from "sst/constructs";

export function AppStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [table],
      },
    },
    routes: {
      "GET /trpc/{proxy+}": "../../packages/api/router.handler",
      "POST /trpc/{proxy+}": "../../packages/api/router.handler",
    },
  });

  const site = new NextjsSite(stack, "site", {
    environment: {
      NEXT_PUBLIC_API_URL: api.url
    }
  });

  // Show the URLs in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
  });
}