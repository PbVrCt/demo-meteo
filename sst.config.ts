import { SSTConfig } from "sst";
import { Web } from "./src/stacks/web";
import { API } from "./src/stacks/api";

export default {
  config(_input) {
    return {
      name: "demo-meteo",
      region: "ap-northeast-1",
      stage: "dev",
    };
  },
  stacks(app) {
    app.stack(API).stack(Web);
  },
} satisfies SSTConfig;
