ARG NODE_VERSION=19-alpine3.16
ARG NGINX_VERSION=1.23.3-alpine

FROM node:${NODE_VERSION} as takeavet_dev
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY vite.config.js vite.config.js

RUN set -eux; \
    npm install
COPY . ./
VOLUME node_modules
EXPOSE 5173
CMD "npm" "start"

FROM takeavet_dev AS takeavet_build
ARG TAKEAVET_API_ENTRYPOINT
RUN set -eux; \ 
        npm run build

FROM nginx:${NGINX_VERSION} AS takeavet_nginx
COPY docker/nginx/conf.d/default.conf /etc/nginx/conf.d/
WORKDIR /usr/src/app
COPY --from=takeavet_build /usr/src/app ./
