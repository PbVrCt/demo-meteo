import { SSTConfig } from "sst";
import { Web } from "./stacks/web";
import { API } from "./stacks/api";

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
