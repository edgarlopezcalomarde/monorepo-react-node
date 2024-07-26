FROM node:20.16 AS base

ENV DIR /app
WORKDIR $DIR

FROM base as build

COPY . .

RUN npm ci
RUN npm run build && \
    npm prune --production

FROM base as production

COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
# COPY --from=build $DIR/.env $DIR/.env

ENV NODE_ENV=production

RUN npm install -g http-server
CMD ["http-server", "dist", "-p", "4173"]





