FROM node:12.13-alpine

RUN apk add -U --no-cache curl bash openssl

WORKDIR /destino-backend

# Add dockerize tool
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY ./package.json ./

EXPOSE 3000

CMD dockerize -wait tcp://mongo-destino:27017 -timeout 400s -wait-retry-interval 10s npm run start:dev
