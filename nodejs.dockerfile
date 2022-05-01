### BUILD APP ###

FROM node:14-buster AS builder

ARG NODE_ENV=build
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-progress --quiet

COPY . .

RUN npm run build


### CREATE HOST CONTAINER ###

FROM node:14-buster AS host

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

RUN apt-get update -y &&\
    apt-get install -y \
      nano &&\
    rm -rf /var/cache/apt-get/* &&\
    curl https://getmic.ro | bash &&\
    mv micro /usr/local/bin/

### CREATE PROD CONTAINER ###

FROM host AS prod

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

# CMD ["node", "/app/dist/server"]
CMD ["npm", "start"]
