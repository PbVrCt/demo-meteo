FROM public.ecr.aws/lambda/python:3.11

WORKDIR ${LAMBDA_TASK_ROOT}

# Install the dependencies
COPY python/wind/wind.txt .
RUN pip3 install --no-cache-dir -r wind.txt --target "${LAMBDA_TASK_ROOT}"

# Copy the function code
COPY python/wind/wind.py ${LAMBDA_TASK_ROOT}

# Set the handler function
CMD [ "wind.handler" ]


