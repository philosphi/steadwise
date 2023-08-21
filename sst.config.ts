import { SSTConfig } from "sst";
import { Default } from "./stacks"

export default {
  config(_input) {
    return {
      name: "next",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Default);
  },
} satisfies SSTConfig;
