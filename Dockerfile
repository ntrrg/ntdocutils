FROM python:3.14-alpine3.23 AS build
WORKDIR /usr/src/app
#COPY requirements.txt ./
#RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN pip install --no-cache-dir .
RUN rm -rf \
  /usr/local/lib/python3.14/site-packages/pip* \
  /usr/local/lib/python3.14/site-packages/setuptools* \
  /usr/local/lib/python3.14/site-packages/wheel*

FROM gcr.io/distroless/python3
COPY --from=build /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages
COPY --from=build /usr/local/bin/ntdocutils /usr/local/bin/ntdocutils
ENV PYTHONPATH=/usr/local/lib/python3.14/site-packages
ENTRYPOINT ["/usr/bin/python3", "/usr/local/bin/ntdocutils"]
