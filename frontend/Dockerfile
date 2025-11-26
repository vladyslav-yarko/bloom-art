# ARG NODE_VERSION=20-alpine
ARG NODE_VERSION=20-bullseye-slim


###
FROM node:${NODE_VERSION} AS base


LABEL maintainer="vladyslav-yarko"
LABEL org.opencontainers.image.source="https://github.com/vladyslav-yarko/bloom-art"
# LABEL org.opencontainers.image.description=description


WORKDIR /app


###
FROM base AS dev

COPY package*.json yarn.lock ./

RUN yarn install --network-timeout 1000000 --frozen-lockfile

COPY . .

EXPOSE 3000


ENTRYPOINT [ "yarn" ]
CMD [ "run", "dev" ]


###
FROM base AS prod

COPY package*.json yarn.lock ./

# RUN npm install --production
# RUN yarn install --network-timeout 1000000 --frozen-lockfile --ignore-optional
RUN apt-get update && apt-get install -y python3 g++ make \
    && yarn install --network-timeout 1000000 --frozen-lockfile --ignore-optional --build-from-source

COPY . .

RUN yarn run build

EXPOSE 3000


ENTRYPOINT [ "yarn" ]
CMD [ "start" ]

# ENTRYPOINT ["npm", "start", "--"]
# CMD ["-H", "0.0.0.0", "-p", "3000"]
