ARG NODE_VERSION=20-alpine


###
FROM node:${NODE_VERSION} AS base


LABEL maintainer="vladyslav-yarko"
LABEL org.opencontainers.image.source="https://github.com/vladyslav-yarko/bloom-art"
# LABEL org.opencontainers.image.description=description


WORKDIR /app


###
FROM base AS dev

COPY package*.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3000


ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]


###
FROM base AS prod

COPY package*.json yarn.lock ./

# RUN npm install --production
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000


ENTRYPOINT [ "npm" ]
CMD [ "start" ]

# ENTRYPOINT ["npm", "start", "--"]
# CMD ["-H", "0.0.0.0", "-p", "3000"]
