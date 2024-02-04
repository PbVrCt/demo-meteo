import {
  Certificate,
  CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import { CnameRecord, HostedZone } from "aws-cdk-lib/aws-route53";
import { StackContext } from "sst/constructs";

const PRODUCTION = "xn--u9jzj2au6d3c.com"; // punnycode for パブロのデモ.com

export function DNS({ stack, app }: StackContext) {
  if (stack.stage === "production") {
    const zone = new HostedZone(stack, "zone", {
      zoneName: PRODUCTION,
    });
    new Certificate(stack, "Certificate", {
      domainName: PRODUCTION,
      validation: CertificateValidation.fromDns(zone),
    });
    return {
      zone,
      domain: PRODUCTION,
    };
  }
}
