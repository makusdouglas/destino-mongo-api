FROM node:18-alpine

RUN apk add -U --no-cache curl bash openssl

WORKDIR /destino-backend

# Add dockerize tool
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# RUN npm install -g yarn

COPY ./package.json ./


CMD dockerize -wait tcp://mongo-destino:27017 -timeout 400s -wait-retry-interval 10s yarn start:dev

EXPOSE 3000