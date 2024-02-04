import { SSTConfig } from "sst";
import { DNS } from "./stacks/dns";
import { API } from "./stacks/api";
import { Web } from "./stacks/web";

export default {
  config(_input) {
    return {
      name: "demo-meteo",
      region: "ap-northeast-1",
      stage: "dev",
    };
  },
  stacks(app) {
    app.stack(DNS).stack(API).stack(Web);
  },
} satisfies SSTConfig;
