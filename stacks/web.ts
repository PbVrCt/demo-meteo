import { NextjsSite, StackContext, use } from "sst/constructs";
import { API } from "./api";

export function Web({ stack, app }: StackContext) {
  const api = use(API);

  const site = new NextjsSite(stack, "site", {
    bind: [api],
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
