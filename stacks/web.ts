import { NextjsSite, StackContext, use } from "sst/constructs";
import { DNS } from "./dns";
import { API } from "./api";

export function Web({ stack, app }: StackContext) {
  const dns = use(DNS);
  const api = use(API);

  const site = new NextjsSite(stack, "site", {
    bind: [api],
    customDomain:
      stack.stage === "production"
        ? {
            domainName: dns!.domain,
            domainAlias: "www." + dns!.domain,
          }
        : undefined,
  });

  stack.addOutputs({
    Site: site.customDomainUrl || site.url,
  });
}
