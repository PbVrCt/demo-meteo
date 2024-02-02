FROM public.ecr.aws/lambda/python:3.11

WORKDIR /root

# Install the dependencies
COPY python/hello/hello.txt .
RUN pip install --upgrade pip -q \
    pip3 install --no-cache-dir -r hello.txt --target "${LAMBDA_TASK_ROOT}"

# Copy the function code
COPY python/hello/hello.py ${LAMBDA_TASK_ROOT}

# Set the handler function
CMD [ "hello.handler" ]


