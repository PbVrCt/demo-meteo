from aws_lambda_powertools import Logger, Metrics, Tracer

metrics = Metrics(service="backend", namespace="demo_meteo")
tracer = Tracer(service="backend")
logger = Logger(service="backend")


@metrics.log_metrics(capture_cold_start_metric=True)
@tracer.capture_lambda_handler
@logger.inject_lambda_context
def handler(event, context):
    return {"statusCode": 200, "body": "Hello world!"}
