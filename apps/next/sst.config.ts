import { SSTConfig } from "sst";
import { AppStack } from "../../packages/api/stacks/AppStack"

export default {
  config(_input) {
    return {
      name: "next",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(AppStack);
  },
} satisfies SSTConfig;
