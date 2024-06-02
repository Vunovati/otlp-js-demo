ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-bullseye

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

USER node

# Copy the rest of the source files into the image.
COPY . .

ENV API_HOST 0.0.0.0
CMD ["node", "-r", "./tracing/auto-instrumentation.js", "index.js"]
