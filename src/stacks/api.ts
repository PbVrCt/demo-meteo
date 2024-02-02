import { StackContext, Api } from "sst/constructs";

export function API({ stack, app }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /wind":
        app.mode === "dev"
          ? {
              function: {
                handler: "src/packages/functions/src/python/wind/wind.handler",
                runtime: "python3.11",
              },
            }
          : {
              function: {
                handler: "src/packages/functions/src/python/wind",
                runtime: "container",
                container: {
                  cmd: ["wind.handler"],
                  file: "python/wind/wind.Dockerfile",
                },
                architecture: "x86_64",
              },
            },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
