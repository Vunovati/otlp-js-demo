FROM node:18

ENV API_HOST 0.0.0.0
WORKDIR /app

ADD package.json .
ADD package-lock.json .
RUN npm install

ADD . .

ENTRYPOINT [ "node", "-r", "'./tracing.js'", "index.js" ]
